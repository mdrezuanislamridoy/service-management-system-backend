import type { NextFunction, Request, Response } from "express";
import { serviceService } from "./service.service.js";

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await serviceService.createService(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMyServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await serviceService.getMyServices(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await serviceService.getAllServices(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

