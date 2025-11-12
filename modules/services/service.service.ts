import type { Request } from "express";
import { getPrisma } from "../../utils/prisma.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

const prisma = getPrisma();

const createService = async (req: Request) => {
  const providerId = req.user.id;
  const { categoryId } = req.body;

  const service = await prisma.service.create({
    data: {
      ...req.body,
      categoryId,
      providerId,
    },
  });
  await prisma.user.update({
    where: {
      id: providerId,
    },
    data: {
      services: {
        connect: {
          id: service.id,
        },
      },
    },
  });
  await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      services: {
        connect: {
          id: service.id,
        },
      },
    },
  });

  return {
    success: true,
    message: "Service created successfully",
    service,
  };
};

const getMyServices = async (req: Request) => {
  const providerId = req.user.id;
  const services = await prisma.service.findMany({
    where: {
      providerId,
    },
  });
  if (services.length === 0) {
    throw createHttpError(StatusCodes.NOT_FOUND, "No services found");
  }
  return {
    success: true,
    message: "Services fetched successfully",
    services,
  };
};

const getAllServices = async (req: Request) => {
  const services = await prisma.service.findMany({
    include: {
      provider: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  if (services.length === 0) {
    throw createHttpError(StatusCodes.NOT_FOUND, "No services found");
  }
  return {
    success: true,
    message: "Services fetched successfully",
    services,
  };
};

export const serviceService = { createService, getMyServices, getAllServices };
