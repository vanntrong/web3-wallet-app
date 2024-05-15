export type TSuggestedGasItem = {
  suggestedMaxPriorityFeePerGas: string;
  suggestedMaxFeePerGas: string;
  minWaitTimeEstimate: number;
  maxWaitTimeEstimate: number;
};

export type TSuggestedGasType = "low" | "medium" | "high";

export type TSuggestedGasFees = {
  low: TSuggestedGasItem;
  medium: TSuggestedGasItem;
  high: TSuggestedGasItem;
  estimatedBaseFee: string;
  priorityFeeTrend?: string;
  baseFeeTrend?: string;
};
