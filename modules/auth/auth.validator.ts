import z from "zod";

const createUserSchema = z.object({
  name: z.string("Name is required"),
  email: z.email("Invalid email"),
  password: z.string("Password is required").min(6),
});

export { createUserSchema };
