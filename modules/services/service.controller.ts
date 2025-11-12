import type { Request, Response, NextFunction } from "express";
import {
  createService,
  getServices,
  getMyServices,
} from "./service.service.js";

export const addService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createService(req);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const listServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getServices(req);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const myServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getMyServices(req);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
