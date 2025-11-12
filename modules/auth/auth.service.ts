import type { Request } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { getPrisma } from "../../utils/prisma.js";
import { Role } from "@prisma/client";
import generateToken from "../../utils/generateToken.js";

const prisma = getPrisma();

const createUser = async (req: Request) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw createHttpError(400, "All fields are required");
  }

  const isUser = await prisma.user.findUnique({
    where: { email },
  });
  if (isUser) {
    throw createHttpError(400, "User already exists");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPass,
      role: Role.USER,
    },
  });

  return {
    success: true,
    message: "User created successfully",
    user,
  };
};

const login = async (req: Request) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createHttpError(400, "All fields are required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user?.role ==="PROVIDER" &&user?.status==="PENDING") {
    
  }

  if (!user) {
    throw createHttpError(400, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createHttpError(400, "Invalid credentials");
  }

  const userWithoutPass = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken({
    id: user.id,
    role: user.role,
  });
  const refreshToken = generateToken({
    id: user.id,
    role: user.role,
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refresh_token: refreshToken,
    },
  });

  return {
    success: true,
    message: "User logged in successfully",
    user: userWithoutPass,
    accessToken,
    refreshToken,
  };
};

const getProfile = async (req: Request) => {
  const user = req.user;

  const userWithoutPass = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return {
    success: true,
    message: "User profile fetched successfully",
    user: userWithoutPass,
  };
};

export const authService = { createUser, login, getProfile };
