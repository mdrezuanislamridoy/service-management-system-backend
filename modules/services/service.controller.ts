import type { NextFunction, Request, Response } from "express";

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
