import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useDebounceValue } from "usehooks-ts";

import SwapInput from "../components/swapInput";
import SwapSelectTokenBottomSheet from "../components/swapSelectTokenBottomSheet";
import useGetSwapQuote from "../services/useGetSwapQuote";
import { useSwapEstimateGas } from "../services/useSwapEstimateGas";
import useSwapToken from "../services/useSwapToken";

import Button from "@/components/button";
import IconButton from "@/components/iconButton";
import RowValue from "@/components/rowValue";
import SkeletonPlaceholder from "@/components/skeletonPlaceholder";
import TextAnimation from "@/components/skeletonPlaceholder/textAnimation";
import { COLORS } from "@/configs/colors";
import useSuggestedGas from "@/hooks/useSuggestedGas";
import useGetTokens from "@/modules/token/services/useGetTokens";
import { TMainToken, TToken } from "@/modules/token/types";
import GasFeeSelectorBottomSheet from "@/modules/wallet/components/gasFeeSelectorBottomSheet";
import { useNetworkStore, useTokenStore } from "@/stores/globalStore";
import { formatNumber } from "@/utils/converter";
import { showToast } from "@/utils/toast";

const windowHeight = Dimensions.get("window").height - 40;
const SwapScreen = () => {
  const { currentNetwork } = useNetworkStore();
  const { mainToken } = useTokenStore();

  const [keyword, setKeyword] = useDebounceValue("", 300);
  const { data: { data: tokensResponse } = {} } = useGetTokens(
    {
      keyword,
      networkId: currentNetwork?.id,
    },
    {
      enabled: !!currentNetwork?.id,
    }
  );

  const [selectTokenBottomSheetState, setSelectTokenBottomSheetState] =
    useState<{
      open: boolean;
      type: "from" | "to";
    }>({
      open: false,
      type: "from",
    });

  const [swapData, setSwapData] = useState<{
    from?: TToken | TMainToken;
    to?: TToken | TMainToken;
    amountIn?: string;
  }>({
    from: mainToken,
  });

  const {
    isGetSuggestedGasFetching,
    isShowGasFeeSelector,
    setIsShowGasFeeSelector,
    suggestedGas,
    setSuggestedGas,
    suggestedGasResponse,
  } = useSuggestedGas(currentNetwork?.id);

  const {
    data: { data: quoteResponse } = {},
    isFetching: isFetchingSwapQuote,
  } = useGetSwapQuote(
    {
      tokenIn: swapData.from?.contractAddress,
      tokenOut: swapData.to?.contractAddress,
      amount: Number(swapData.amountIn),
      networkId: currentNetwork?.id ?? "",
    },
    {
      enabled:
        !!swapData.amountIn &&
        !!currentNetwork &&
        (!!swapData.to?.contractAddress || !!swapData.from?.contractAddress),
    }
  );

  const { data: { data } = {}, isFetching } = useSwapEstimateGas(
    {
      networkId: currentNetwork?.id ?? "",
      amount: Number(swapData.amountIn),
      tokenIn: swapData.from?.contractAddress,
      tokenOut: swapData.to?.contractAddress ?? "",
      ...suggestedGas,
    },
    {
      enabled:
        !!currentNetwork &&
        !!swapData.amountIn &&
        !!swapData.to &&
        !isGetSuggestedGasFetching,
    }
  );

  const { mutateAsync: swap, isPending: isSwapping } = useSwapToken();

  const handleSelectToken = (addressOrSymbol: string, type: "from" | "to") => {
    let token: any = tokensResponse?.data.find(
      (token) =>
        token.contractAddress === addressOrSymbol ||
        token.symbol === addressOrSymbol
    );
    if (!token) token = mainToken;

    if (type === "from") {
      setSwapData({ ...swapData, from: token, amountIn: "0" });
    } else {
      setSwapData({ ...swapData, to: token });
    }
  };

  const isEnableSwapButton = useMemo(() => {
    return (
      swapData.to &&
      swapData.amountIn &&
      Number(swapData.amountIn) > 0 &&
      currentNetwork
    );
  }, [currentNetwork, swapData.amountIn, swapData.to]);

  const amountOutValue = useMemo(() => {
    if (!quoteResponse?.data.amountOut) return "0";
    const amountOut = quoteResponse?.data.amountOut.toString();
    const numberOfDigitsAmountOut =
      amountOut.toString().split(".")[1]?.length ?? 0;
    const digit = Math.min(numberOfDigitsAmountOut, 4);
    const formatted = formatNumber(quoteResponse.data.amountOut, digit);
    return formatted?.toString();
  }, [quoteResponse?.data.amountOut]);

  const isFetchingGas = useMemo(() => {
    return isGetSuggestedGasFetching || isFetching || isFetchingSwapQuote;
  }, [isFetching, isGetSuggestedGasFetching, isFetchingSwapQuote]);

  const handleSwapPairPress = () => {
    const from = swapData.from;
    const to = swapData.to;
    const amountIn = swapData.amountIn;
    setSwapData({
      amountIn,
      from: to,
      to: from,
    });
  };

  const handleSwapPress = async () => {
    if (
      !currentNetwork ||
      !swapData.amountIn ||
      (!swapData.to?.contractAddress && !swapData.from?.contractAddress)
    )
      return;
    await swap({
      networkId: currentNetwork?.id,
      amount: Number(swapData.amountIn),
      tokenOut: swapData.to?.contractAddress,
      tokenIn: swapData.from?.contractAddress,
      baseFee: Number(suggestedGas.baseFee),
      maxPriorityFeePerGas: Number(suggestedGas.maxPriorityFeePerGas),
    });
    showToast({
      type: "pendingToast",
      title: `Swapping ${swapData.amountIn} ${swapData.from?.symbol} to ${swapData.to?.symbol}`,
    });
  };

  const tokensWithNative = useMemo(() => {
    if (!tokensResponse?.data) return [];
    if (!mainToken) return tokensResponse.data;
    return [mainToken, ...tokensResponse.data];
  }, [mainToken, tokensResponse?.data]);

  useEffect(() => {
    if (currentNetwork && mainToken) {
      setSwapData({ from: mainToken, amountIn: "0" });
    }
  }, [mainToken, currentNetwork]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView
        style={{
          flex: 1,
          minHeight: windowHeight,
        }}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Swap</Text>
          <View style={styles.inputWrapper}>
            <SwapInput
              label="From"
              useMax
              onSelectTokenClick={() =>
                setSelectTokenBottomSheetState({ open: true, type: "from" })
              }
              selectedToken={swapData.from}
              value={swapData.amountIn}
              onValueChange={(value) =>
                setSwapData({ ...swapData, amountIn: value.replace(",", ".") })
              }
            />
            <SwapInput
              label="To"
              onSelectTokenClick={() =>
                setSelectTokenBottomSheetState({ open: true, type: "to" })
              }
              readonly
              selectedToken={swapData.to}
              value={amountOutValue}
            />
            <IconButton
              style={styles.swapPairButton}
              onPress={handleSwapPairPress}
            >
              <MaterialCommunityIcons
                name="swap-vertical"
                size={20}
                color={COLORS.gray24}
              />
            </IconButton>
          </View>
          <View style={styles.editNetworkFee}>
            <RowValue
              label={
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <Text>Network fee</Text>
                  <TouchableOpacity
                    onPress={() => setIsShowGasFeeSelector(true)}
                    style={styles.editGas}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: COLORS.gray24,
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              }
              // value={`${formatNumber(data?.data, 6)} ${mainToken?.symbol}`}
              value={
                <SkeletonPlaceholder
                  skeleton={
                    <TextAnimation
                      height={10}
                      width={60}
                      style={{ alignSelf: "flex-end" }}
                    />
                  }
                  isLoading={isFetchingGas}
                >
                  <Text>
                    {formatNumber(data?.data, 6)} {mainToken?.symbol}
                  </Text>
                </SkeletonPlaceholder>
              }
              labelStyle={styles.totalSubTitle}
              valueStyle={styles.totalSubValue}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              disabled={!isEnableSwapButton || isFetching}
              onPress={handleSwapPress}
              isLoading={isSwapping}
            >
              Swap
            </Button>
          </View>
        </View>
      </SafeAreaView>
      <SwapSelectTokenBottomSheet
        isOpen={selectTokenBottomSheetState.open}
        type={selectTokenBottomSheetState.type}
        onClose={() =>
          setSelectTokenBottomSheetState({ open: false, type: "from" })
        }
        swapData={swapData}
        onSelectToken={handleSelectToken}
        tokens={tokensWithNative}
        onSearchToken={setKeyword}
      />
      <GasFeeSelectorBottomSheet
        isOpen={isShowGasFeeSelector}
        onClose={() => setIsShowGasFeeSelector(false)}
        data={suggestedGasResponse?.data}
        setSuggestedGas={setSuggestedGas}
      />
    </KeyboardAvoidingView>
  );
};

export default SwapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.gray24,
    textAlign: "center",
  },
  inputWrapper: {
    marginTop: 24,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  totalSubTitle: {
    fontSize: 14,
    color: COLORS.gray12,
  },
  totalValue: {
    fontSize: 16,
    color: COLORS.gray24,
  },
  totalSubValue: {
    fontSize: 14,
    color: COLORS.gray12,
  },
  editGas: {
    width: 50,
    height: 20,
    backgroundColor: COLORS.primary3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  swapPairButton: {
    flex: 0,
    width: 50,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: COLORS.secondary5,
    position: "absolute",
  },
  editNetworkFee: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    width: "100%",
  },
});
