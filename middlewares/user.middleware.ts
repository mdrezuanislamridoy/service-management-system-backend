import type { Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/dotenv.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { getPrisma } from "../utils/prisma.js";

const prisma = getPrisma();

const userMiddleware = async (req: Request, res: Response, next: any) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw createHttpError(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        password: false,
      },
    });

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
  }
};

export default userMiddleware;
