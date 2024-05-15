import { REGEX_CONTRACT_ADDRESS } from "@/constants/regex";

export const validateAddress = (address: string) =>
  REGEX_CONTRACT_ADDRESS.test(address);
