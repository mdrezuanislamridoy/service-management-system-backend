import type { Request } from "express";
import sslcommerz from "sslcommerz-lts";
import { getPrisma } from "../../utils/prisma.js";
import createHttpError from "http-errors";
import { env } from "../../config/dotenv.js";

const prisma = getPrisma();

export const payWithSSLCOMMERZ = async (req: Request) => {
  const { bookingId } = req.params;
  const booking = await prisma.booking.findUnique({
    where: { id: Number(bookingId) },
    include: { service: true },
  });
  if (!booking) throw createHttpError(404, "Booking not found");

  const tranId = `TRX${Date.now()}`;
  const data = {
    total_amount: booking.totalAmount,
    currency: "BDT",
    tran_id: tranId,
    success_url: `${env.CLIENT_URL}/payment/success`,
    fail_url: `${env.CLIENT_URL}/payment/fail`,
    cancel_url: `${env.CLIENT_URL}/payment/cancel`,
    cus_name: req.user.name,
    cus_email: req.user.email,
    product_name: booking.service.title,
  };

  const sslcz = new sslcommerz(
    env.SSLCOMMERZ_STORE_ID,
    env.SSLCOMMERZ_STORE_PASSWORD,
    false
  );
  const response = await sslcz.init(data);

  if (response.GatewayPageURL) {
    await prisma.booking.update({
      where: { id: booking.id },
      data: { transactionId: tranId, paymentMethod: "SSLCOMMERZ" },
    });
    return { success: true, redirectUrl: response.GatewayPageURL };
  }
  throw createHttpError(500, "Payment initiation failed");
};

export const payWithCash = async (req: Request) => {
  const { bookingId } = req.params;
  await prisma.booking.update({
    where: { id: Number(bookingId) },
    data: { paymentMethod: "CASH" },
  });
  return { success: true, message: "Pay with cash on service" };
};
