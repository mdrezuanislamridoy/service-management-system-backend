import { getPrisma } from "../../utils/prisma.js";

const prisma = getPrisma();

export const getDashboard = async () => {
  const [users, providers, services, bookings] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.user.count({ where: { role: "PROVIDER" } }),
    prisma.service.count(),
    prisma.booking.count(),
  ]);

  return { success: true, data: { users, providers, services, bookings } };
};

export const approveProvider = async (id: number) => {
  return prisma.user.update({ where: { id }, data: { status: "APPROVED" } });
};

export const rejectProvider = async (id: number) => {
  return prisma.user.update({ where: { id }, data: { status: "REJECTED" } });
};
