import type { Request, Response, NextFunction } from "express";
import {
  register,
  login,
  getProfile,
  logoutService,
  refreshAccessToken,
} from "./auth.service.js";
import { StatusCodes } from "http-status-codes";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await register(req);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await login(req);
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getProfile(req);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await logoutService(req, res);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await refreshAccessToken(req);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
