import z from "zod";
declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export { createUserSchema };
//# sourceMappingURL=auth.validator.d.ts.map