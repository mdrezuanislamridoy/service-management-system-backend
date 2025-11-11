import jwt, {} from "jsonwebtoken";
import { env } from "../config/dotenv.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { getPrisma } from "../utils/prisma.js";
const prisma = getPrisma();
const userMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw createHttpError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
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
    }
    catch (error) {
        next(createHttpError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
    }
};
export default userMiddleware;
//# sourceMappingURL=user.middleware.js.map