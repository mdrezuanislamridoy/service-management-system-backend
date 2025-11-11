import createHttpError from "http-errors";
import { ZodError, ZodType } from "zod";
const validator = (schema) => {
    return (req, res, next) => {
        try {
            const body = req.body;
            const result = schema.safeParse(body);
            if (!result.success) {
                return res.status(400).json(result.error);
            }
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((err) => err.message).join(", ");
                next(createHttpError(400, errorMessages));
            }
        }
    };
};
export default validator;
//# sourceMappingURL=validator.js.map