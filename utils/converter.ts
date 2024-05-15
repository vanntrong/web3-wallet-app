import Decimal from "decimal.js";
const DecimalRounding = Decimal.clone({
  // precision: 10,
  rounding: Decimal.ROUND_FLOOR,
});

export const formatNumber = (number?: number, fractionDigits = 5) => {
  if (!number) return "0";
  const _number = new DecimalRounding(number);

  return parseFloat(_number.toPrecision(fractionDigits));
};

export const formatPrice = (number: number, fractionDigits = 5) => {
  if (!number) return;

  const _number = new DecimalRounding(number);

  return "$" + parseFloat(_number.toPrecision(fractionDigits));
};

export const formatContractAddress = (contractAddress?: string | null) => {
  if (!contractAddress) return;

  return contractAddress.slice(0, 6) + "..." + contractAddress.slice(-4);
};

export const convertPriceFromPythNetwork = (price?: number | string) => {
  return Number(price || 0) / 10 ** 8;
};

export const getAvatarLabel = (name?: string) => {
  if (!name) return;
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 3)
    .join("");
};

export const sliceTokenName = (name?: string) => {
  if (!name) return;
  if (name.length < 16) return name;
  return name.slice(0, 6) + "..." + name.slice(-4);
};
