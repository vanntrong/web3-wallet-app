import * as z from "zod";

export const createWalletSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    checked: z.boolean({
      required_error: "Please accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.checked, {
    message: "Please accept the terms and conditions",
    path: ["checked"],
  });

export type TCreateWalletSchema = z.infer<typeof createWalletSchema>;
