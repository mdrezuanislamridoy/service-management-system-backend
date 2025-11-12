import type { Request, Response, NextFunction } from "express";
import { payWithSSLCOMMERZ, payWithCash } from "./payment.service.js";

export const sslcommerz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await payWithSSLCOMMERZ(req);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const cash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await payWithCash(req);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
