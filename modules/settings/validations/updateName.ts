import * as z from "zod";

export const updateNameSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name must be at least 1 character")
    .trim(),

  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name must be at least 1 character")
    .trim(),
});

export type TUpdateNameSchema = z.infer<typeof updateNameSchema>;
