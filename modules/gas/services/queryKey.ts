import { TUseGetSuggestedGasOptions } from "./useGetSuggestedGas";

export const gasQueryKey = {
  getSuggestedGasFee: (options?: TUseGetSuggestedGasOptions) => [
    "gas-suggested-gas-fees",
    options,
  ],
};
