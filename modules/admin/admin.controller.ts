import type { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service.js";

export const approveServiceProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await adminService.approveServiceProvider(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const rejectServiceProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await adminService.rejectServiceProvider(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};


export const getAllData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await adminService.getAllData(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};