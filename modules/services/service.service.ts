import type { Request } from "express";
import { getPrisma } from "../../utils/prisma.js";
import createHttpError from "http-errors";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload.js";

const prisma = getPrisma();

export const createService = async (req: Request) => {
  const providerId = req.user.id;
  const { title, description, categoryId, price, location } = req.body;
  const files = req.files as Express.Multer.File[];

  if (req.user.role !== "PROVIDER" || req.user.status !== "APPROVED") {
    throw createHttpError(403, "Not approved provider");
  }

  const images = files ? await Promise.all(files.map(uploadToCloudinary)) : [];

  const service = await prisma.service.create({
    data: {
      providerId,
      categoryId: Number(categoryId),
      title,
      description,
      price: Number(price),
      location,
      images,
    },
  });

  return { success: true, message: "Service created", service };
};

export const getServices = async (req: Request) => {
  const { category, location, minPrice, maxPrice } = req.query;
  const where: any = { isActive: true };

  if (category) where.categoryId = Number(category);
  if (location)
    where.location = { contains: location as string, mode: "insensitive" };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const services = await prisma.service.findMany({
    where,
    include: {
      provider: { select: { name: true, avatar: true } },
      category: { select: { name: true } },
      reviews: { select: { rating: true } },
    },
  });

  return { success: true, services };
};

export const getMyServices = async (req: Request) => {
  const services = await prisma.service.findMany({
    where: { providerId: req.user.id },
    include: { category: true },
  });
  return { success: true, services };
};
