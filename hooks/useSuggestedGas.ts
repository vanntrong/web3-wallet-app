import { useEffect, useState } from "react";

import useGetSuggestedGas from "@/modules/gas/services/useGetSuggestedGas";

const useSuggestedGas = (networkId?: string) => {
  const [suggestedGas, setSuggestedGas] = useState<{
    maxPriorityFeePerGas: string | null;
    baseFee: string | null;
  }>({
    maxPriorityFeePerGas: null,
    baseFee: null,
  });
  const [isShowGasFeeSelector, setIsShowGasFeeSelector] = useState(false);

  const {
    data: { data: suggestedGasResponse } = {},
    isFetching: isGetSuggestedGasFetching,
    refetch,
  } = useGetSuggestedGas(
    {
      networkId,
    },
    {
      enabled: !!networkId,
    }
  );

  useEffect(() => {
    if (suggestedGasResponse?.data) {
      setSuggestedGas({
        baseFee: suggestedGasResponse.data.estimatedBaseFee,
        maxPriorityFeePerGas:
          suggestedGasResponse.data.medium?.suggestedMaxPriorityFeePerGas,
      });
    }
  }, [suggestedGasResponse]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("refetching...", Date.now());
      refetch();
    }, 15000);

    return () => clearInterval(timer);
  }, [refetch]);

  return {
    suggestedGas,
    isGetSuggestedGasFetching,
    isShowGasFeeSelector,
    setIsShowGasFeeSelector,
    setSuggestedGas,
    suggestedGasResponse,
  };
};

export default useSuggestedGas;
