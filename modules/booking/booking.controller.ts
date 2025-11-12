import type { Request, Response, NextFunction } from "express";
import { createBooking, updateBookingStatus } from "./booking.service.js";

export const bookService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createBooking(req);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const changeStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await updateBookingStatus(req);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
