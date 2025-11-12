import type { Request } from "express";
import { getPrisma } from "../../utils/prisma.js";

const prisma = getPrisma();

const addCategory = async (req: Request) => {
  const { name } = req.body;

  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  return {
    success: true,
    message: "Category created successfully",
    category,
  };
};
const getAllCategories = async (req: Request) => {
  const categories = await prisma.category.findMany({});
  return {
    success: true,
    message: "Categories fetched successfully",
    categories,
  };
};

export const categoryService = { addCategory, getAllCategories };
