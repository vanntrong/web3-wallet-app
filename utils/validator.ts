import { REGEX_CONTRACT_ADDRESS } from "@/constants/regex";

export const validateAddress = (address: string) =>
  REGEX_CONTRACT_ADDRESS.test(address);

export const validateInputNumber = (
  key: string,
  input: string,
  options?: { maxDecimalFraction?: number; maxNumLength?: number }
) => {
  const { maxDecimalFraction, maxNumLength } = options ?? {};
  if (
    (key === "dot" && input.length < 1) ||
    (key === "dot" && input.includes("."))
  ) {
    return false;
  }

  if (
    maxDecimalFraction &&
    input.includes(".") &&
    input.substring(input.indexOf(".")).length === maxDecimalFraction
  )
    return false;

  if (maxNumLength && input.length >= maxNumLength) return false;
  return true;
};

export const isValidNumber = (value: string) => {
  return !Number.isNaN(Number(value));
};

export const isStringEmpty = (value?: string) => {
  if (!value) return true;
  return value.length > 0;
};
