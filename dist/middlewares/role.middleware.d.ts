import type { NextFunction, Request, Response } from "express";
declare const checkRole: (...roels: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default checkRole;
//# sourceMappingURL=role.middleware.d.ts.map