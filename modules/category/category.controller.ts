import type { Request, Response, NextFunction } from "express";
import { addCategory, getCategories } from "./category.service.js";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await addCategory(req);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const listCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getCategories();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
