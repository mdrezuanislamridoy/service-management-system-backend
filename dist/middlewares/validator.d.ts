import type { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
declare const validator: (schema: ZodType<any>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default validator;
//# sourceMappingURL=validator.d.ts.map