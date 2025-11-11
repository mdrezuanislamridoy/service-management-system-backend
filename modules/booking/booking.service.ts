import type { Request } from "express";
import { getPrisma } from "../../utils/prisma.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

const prisma = getPrisma();

const addBooking = async (req: Request) => {
  const userId = req.user.id;
  const serviceId = Number(req.params.id);
  const { paymentMethod } = req.body;

  const booking = await prisma.booking.create({
    data: {
      userId,
      serviceId,
      paymentMethod,
    },
  });
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      bookings: {
        connect: {
          id: booking.id,
        },
      },
    },
  });

  return {
    success: true,
    message: "Booking created successfully",
    booking,
    redirectUrl: `/payment/pay-bill/${serviceId}`,
  };
};

const getMyBookings = async (req: Request) => {
  const userId = req.user.id;
  const bookings = await prisma.booking.findMany({
    where: {
      userId,
    },
  });
  if (bookings.length === 0) {
    throw createHttpError(StatusCodes.NOT_FOUND, "No bookings found");
  }
  return {
    success: true,
    message: "Bookings fetched successfully",
    bookings,
  };
};

export const bookingService = { addBooking, getMyBookings };
