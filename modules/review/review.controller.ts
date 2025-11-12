import type { Request, Response, NextFunction } from "express";
import { addReview } from "./review.service.js";

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await addReview(req);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
