import type { Request } from "express";
export declare const authService: {
    createUser: (req: Request) => Promise<{
        success: boolean;
        message: string;
        user: {
            name: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            refresh_token: string | null;
            createdAt: Date;
            id: number;
        };
    }>;
    login: (req: Request) => Promise<{
        success: boolean;
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile: (req: Request) => Promise<{
        success: boolean;
        message: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map