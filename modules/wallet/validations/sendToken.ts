import * as z from "zod";

import { REGEX_CONTRACT_ADDRESS } from "@/constants/regex";

export const sendTokenSchema = z.object({
  to: z
    .string({
      required_error: "To is required",
      invalid_type_error: "Please enter a valid address. Start with 0x",
    })
    .regex(
      REGEX_CONTRACT_ADDRESS,
      "Please enter a valid address. Start with 0x"
    ),
  amount: z.string(),
});

export type TSendTokenSchema = z.infer<typeof sendTokenSchema>;
