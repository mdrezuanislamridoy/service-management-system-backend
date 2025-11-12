import type { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service.js";

export const getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await categoryService.getAllCategories(req);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};


export const addCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await categoryService.addCategory(req);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};