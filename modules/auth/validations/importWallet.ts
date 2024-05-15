import * as z from "zod";

export const importWalletSchema = z
  .object({
    mnemonic: z
      .string({
        required_error: "Seed phrase is required",
      })
      .trim(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.mnemonic.split(" ").length >= 12, {
    message: "Seed phrase must be at least 12 words",
    path: ["mnemonic"],
  });

export type TImportWalletSchema = z.infer<typeof importWalletSchema>;
