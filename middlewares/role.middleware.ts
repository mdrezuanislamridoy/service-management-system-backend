import type { NextFunction, Request, Response } from "express";

const checkRole =
  (...roels: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    if (!roels.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
export default checkRole;
