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
};
const getAllCategories = async (req: Request) => {};
const updateCategory = async (req: Request) => {};
const deleteCategory = async (req: Request) => {};