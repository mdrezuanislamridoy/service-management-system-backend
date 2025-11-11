import type { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service.js";

export const addBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await bookingService.addBooking(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await bookingService.getMyBookings(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};