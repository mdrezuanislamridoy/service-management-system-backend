import type { NextFunction, Request, Response } from "express";
import { paymentService } from "./payment.service.js";

export const payBillWithSSLCommerz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await paymentService.makePaymentWithSSLCOMMERZ(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const payBillWithCash = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await paymentService.makePaymentWithCash(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const payBillWithStripe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await paymentService.makePaymentWithStripe(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
