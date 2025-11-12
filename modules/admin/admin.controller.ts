import type { Request, Response, NextFunction } from "express";
import {
  getDashboard,
  approveProvider,
  rejectProvider,
} from "./admin.service.js";

export const dashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getDashboard();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const approve = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = await approveProvider(Number(req.params.id));
    res.json({ success: true, provider });
  } catch (err) {
    next(err);
  }
};

export const reject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provider = await rejectProvider(Number(req.params.id));
    res.json({ success: true, provider });
  } catch (err) {
    next(err);
  }
};
