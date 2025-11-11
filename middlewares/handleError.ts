import type { NextFunction, Request, Response } from "express";

const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong" });
  }
};

export default handleError;
