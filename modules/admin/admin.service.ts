import type { Request } from "express";

import { getPrisma } from "../../utils/prisma.js";

const prisma = getPrisma();

const approveServiceProvider = async (req: Request) => {
  const { id } = req.params;

  const serviceProvider = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "APPROVED",
    },
  });

  return {
    success: true,
    message: "Service provider approved successfully",
    serviceProvider,
  };
};
const rejectServiceProvider = async (req: Request) => {
  const { id } = req.params;

  const serviceProvider = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "REJECTED",
    },
  });

  return {
    success: true,
    message: "Service provider rejected successfully",
    serviceProvider,
  };
};

const getAllData = async (req: Request) => {
  const [
    totalProviders,
    totalUsers,
    totalServices,
    totalBookings,
    totalPendingProviders,
    totalPendingBookings,
    totalBookedBookings,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "PROVIDER",
      },
    }),
    prisma.user.count({
      where: {
        role: "USER",
      },
    }),
    prisma.service.count(),
    prisma.booking.count(),
    prisma.user.count({
      where: {
        role: "PROVIDER",
        status: "PENDING",
      },
    }),
    prisma.booking.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.booking.count({
      where: {
        status: "BOOKED",
      },
    }),
  ]);

  const allData = {
    totalProviders,
    totalUsers,
    totalServices,
    totalBookings,
    totalPendingProviders,
    totalPendingBookings,
    totalBookedBookings,
  };

  return {
    success: true,
    message: "All data fetched successfully",
    allData,
  };
};

export const adminService = {
  approveServiceProvider,
  rejectServiceProvider,
  getAllData,
};
