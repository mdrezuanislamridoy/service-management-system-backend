import { PrismaClient } from "@prisma/client";
let prisma;
export const getPrisma = () => {
    prisma = new PrismaClient();
    return prisma;
};
//# sourceMappingURL=prisma.js.map