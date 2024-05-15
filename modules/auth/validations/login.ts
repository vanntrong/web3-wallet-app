import * as z from "zod";

export const loginSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
