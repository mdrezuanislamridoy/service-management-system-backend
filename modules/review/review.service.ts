import type { Request } from "express";
import { getPrisma } from "../../utils/prisma.js";
import createHttpError from "http-errors";

const prisma = getPrisma();

export const addReview = async (req: Request) => {
  const { bookingId, rating, comment } = req.body;
  const userId = req.user.id;

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (booking?.status !== "COMPLETED")
    throw createHttpError(400, "Service not completed");

  const review = await prisma.review.create({
    data: { userId, serviceId: booking.serviceId, bookingId, rating, comment },
  });

  return { success: true, review };
};
