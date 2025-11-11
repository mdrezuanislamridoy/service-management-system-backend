import type { Request } from "express";
import { getPrisma } from "../../utils/prisma.js";
import sslcommerz from "sslcommerz-lts";
import { fail } from "assert";
import { env } from "../../config/dotenv.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

const prisma = getPrisma();

const makePaymentWithSSLCOMMERZ = async (req: Request) => {
  const { bookingId } = req.params;
  const { totalAmount } = req.body;

  const transactionId = `trx_${Date.now()}`;

  const booking = await prisma.booking.findUnique({
    where: {
      id: Number(bookingId),
    },
    include: {
      service: true,
    },
  });
  const userInfo = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: transactionId,
    success_url: "https://localhost:5173/payment/success",
    fail_url: "https://localhost:5173/payment/fail",
    cancel_url: "https://localhost:5173/payment/cancel",
    ipn_url: "https://localhost:5173/payment/ipn",
    product_profile: "general",
    cus_name: userInfo?.name,
    cus_email: userInfo?.email,
    product_category: booking?.service?.category,
  };

  const sslcz = new sslcommerz(
    env.SSLCOMMERZ_STORE_ID,
    env.SSLCOMMERZ_STORE_PASSWORD,
    env.IS_LIVE
  );

  const initResponse = await sslcz.init(data).catch((sdkError: any) => {
    throw createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, sdkError);
  });

  if (initResponse?.GatewayPageURL) {
    await prisma.booking.update({
      where: {
        id: Number(bookingId),
      },
      data: {
        transactionId,
      },
    });
    return {
      success: true,
      message: "Payment initiated successfully",
      transactionId,
      redirectUrl: initResponse.GatewayPageURL,
    };
  }
};
