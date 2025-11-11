import type { NextFunction, Request, Response } from "express";
export declare const createUserAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const loginUserAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map