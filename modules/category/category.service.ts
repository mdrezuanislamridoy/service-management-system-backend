import type { Request } from "express";
import { getPrisma } from "../../utils/prisma.js";

const prisma = getPrisma();

export const addCategory = async (req: Request) => {
  const { name } = req.body;
  const category = await prisma.category.create({ data: { name } });
  return { success: true, category };
};

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return { success: true, categories };
};
