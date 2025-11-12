import type { Request } from "express";
import { getPrisma } from "../../utils/prisma.js";
import createHttpError from "http-errors";

const prisma = getPrisma();

export const createBooking = async (req: Request) => {
  const userId = req.user.id;
  const { serviceId, paymentMethod = "CASH" } = req.body;

  const service = await prisma.service.findUnique({
    where: { id: Number(serviceId) },
  });
  if (!service?.isActive) throw createHttpError(400, "Service unavailable");

  const booking = await prisma.booking.create({
    data: {
      userId,
      serviceId: service.id,
      paymentMethod,
      totalAmount: service.price,
      status: paymentMethod === "CASH" ? "PENDING" : "PENDING",
    },
  });

  return {
    success: true,
    booking,
    redirectUrl: `/api/v1/payments/${paymentMethod.toLowerCase()}/${
      booking.id
    }`,
  };
};

export const updateBookingStatus = async (req: Request) => {
  const { id } = req.params;
  const { status } = req.body;

  const booking = await prisma.booking.update({
    where: { id: Number(id) },
    data: { status },
  });

  return { success: true, booking };
};
