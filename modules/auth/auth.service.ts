import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { getPrisma } from "../../utils/prisma.js";
import generateToken from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";

const prisma = getPrisma();

export const register = async (req: Request) => {
  const { name, email, password, role = "USER" } = req.body;
  if (!name || !email || !password)
    throw createHttpError(400, "All fields required");

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw createHttpError(400, "User exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role },
  });

  return {
    success: true,
    message: "User created",
    user: { id: user.id, name, email, role },
  };
};

export const login = async (req: Request) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(400, "Invalid credentials");
  }

  if (user.role === "PROVIDER" && user.status === "PENDING") {
    throw createHttpError(403, "Provider not approved yet");
  }

  const accessToken = generateToken({ id: user.id });
  const refreshToken = generateToken({ id: user.id }, "7d");

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    success: true,
    user: { id: user.id, name: user.name, email, role: user.role },
    accessToken,
    refreshToken,
  };
};

export const getProfile = async (req: Request) => {
  const user = req.user;
  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  };
};

export const refreshAccessToken = async (req: Request) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw createHttpError(401, "Refresh token required");

  let decoded: any;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
      id: number;
    };
  } catch {
    throw createHttpError(403, "Invalid refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      refreshToken: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
    },
  });

  if (!user || user.refreshToken !== refreshToken) {
    throw createHttpError(403, "Invalid refresh token");
  }

  const newAccessToken = generateToken({ id: user.id }, "15m");

  const newRefreshToken = generateToken({ id: user.id }, "7d");
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: newRefreshToken },
  });

  return {
    success: true,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutService = async (req: Request, res: Response) => {
  const { id } = req.user;
  await prisma.user.update({ where: { id }, data: { refreshToken: null } });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return { success: true, message: "Logout successful" };
};
