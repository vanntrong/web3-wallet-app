import { useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import GasFeeSelectorBottomSheet from "../components/gasFeeSelectorBottomSheet";
import ToAddressInput from "../components/sendTokenBottomSheet/toAddressInput";
import UserInfo from "../components/sendTokenBottomSheet/userInfo";
import SendTokenLayout from "../layouts/sendTokenLayout";
import { TSendTokenSchema } from "../validations/sendToken";

import Button from "@/components/button";
import Divider from "@/components/divider";
import RowValue from "@/components/rowValue";
import SkeletonPlaceholder from "@/components/skeletonPlaceholder";
import TextAnimation from "@/components/skeletonPlaceholder/textAnimation";
import { COLORS } from "@/configs/colors";
import { useSendTokenContext } from "@/contexts/SendTokenContext";
import useSuggestedGas from "@/hooks/useSuggestedGas";
import { useEstimateGas } from "@/modules/transaction/services/useEstimateGas";
import { useSendTransaction } from "@/modules/transaction/services/useSendTransaction";
import { useNetworkStore, useTokenStore } from "@/stores/globalStore";
import { formatNumber } from "@/utils/converter";
import { delay } from "@/utils/delay";
import { showToast } from "@/utils/toast";

const SendTokenConfirmScreen = () => {
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext<TSendTokenSchema>();
  const { currentNetwork } = useNetworkStore();
  const { selectToken } = useSendTokenContext();
  const { mainToken } = useTokenStore();

  const amount = watch("amount");
  const to = watch("to");
  const { isPending, mutateAsync } = useSendTransaction({
    onSuccess(data) {
      router.dismissAll();
      router.canGoBack() && router.back();

      delay(() => {
        showToast({
          type: "pendingToast",
          title: `Transaction ${data.data.data.id} has been sent`,
        });
      });
    },
  });

  const {
    isGetSuggestedGasFetching,
    isShowGasFeeSelector,
    setIsShowGasFeeSelector,
    suggestedGas,
    setSuggestedGas,
    suggestedGasResponse,
  } = useSuggestedGas(currentNetwork?.id);

  useEffect(() => {
    console.log({ suggestedGas });
  }, [suggestedGas]);

  const {
    data: { data } = {},
    isFetching,
    error,
  } = useEstimateGas(
    {
      networkId: currentNetwork?.id || "",
      amount: Number(amount),
      to,
      tokenAddress: selectToken?.contractAddress,
      ...suggestedGas,
    },
    {
      enabled:
        !!currentNetwork && !!amount && !!to && !isGetSuggestedGasFetching,
    }
  );

  const isFetchingGas = useMemo(() => {
    return isGetSuggestedGasFetching || isFetching;
  }, [isFetching, isGetSuggestedGasFetching]);

  const totalAmount = useMemo(() => {
    if (!selectToken || !("id" in selectToken)) {
      return formatNumber(Number(amount) + (data?.data || 0));
    }
    return amount;
  }, [amount, selectToken, data]);

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = async (data: TSendTokenSchema) => {
    if (!currentNetwork) {
      return;
    }
    await mutateAsync({
      amount: Number(data.amount),
      networkId: currentNetwork?.id,
      to: data.to,
      tokenAddress: selectToken?.contractAddress,
      baseFee: suggestedGas.baseFee ? Number(suggestedGas.baseFee) : null,
      maxPriorityFeePerGas: suggestedGas.maxPriorityFeePerGas
        ? Number(suggestedGas.maxPriorityFeePerGas)
        : null,
    });
  };

  const isHaveEnoughBalance = useMemo(() => {
    if (!selectToken) return true; // true because when we send native token, backend will auto reduce value
    const gasEstimate = data?.data;
    if (!gasEstimate || !mainToken) return true;
    return mainToken?.balance >= gasEstimate;
  }, [data?.data, mainToken, selectToken]);

  useEffect(() => {
    if (suggestedGasResponse?.data) {
      setSuggestedGas({
        baseFee: suggestedGasResponse.data.estimatedBaseFee,
        maxPriorityFeePerGas:
          suggestedGasResponse.data.medium?.suggestedMaxPriorityFeePerGas,
      });
    }
  }, [suggestedGasResponse, setSuggestedGas]);

  return (
    <SendTokenLayout title="Confirm" useHeader>
      <UserInfo />
      <Controller
        control={control}
        name="to"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <ToAddressInput
            value={value}
            setValue={onChange}
            error={error?.message}
          />
        )}
      />
      <View style={styles.container}>
        <View style={styles.totalWrapper}>
          <View style={styles.totalContent}>
            <RowValue
              label="Amount"
              value={`${amount} ${selectToken?.symbol}`}
              labelStyle={styles.totalTitle}
              valueStyle={styles.totalValue}
            />
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
                      style={{
                        width: 50,
                        height: 20,
                        backgroundColor: COLORS.primary3,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                      }}
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
                value={`${formatNumber(data?.data, 6)} ${mainToken?.symbol}`}
                labelStyle={styles.totalSubTitle}
                valueStyle={styles.totalSubValue}
              />
            </SkeletonPlaceholder>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.totalContent}>
            <RowValue
              label="Total amount"
              value={`${formatNumber(Number(totalAmount), 6)} ${selectToken?.symbol}`}
              labelStyle={styles.totalTitle}
              valueStyle={styles.totalLargeValue}
            />
            <SkeletonPlaceholder
              skeleton={
                <TextAnimation
                  height={10}
                  width={100}
                  style={{ alignSelf: "flex-end" }}
                />
              }
              isLoading={isFetchingGas}
            >
              <RowValue
                value={`${formatNumber(data?.data, 6)} ${mainToken?.symbol}`}
                valueStyle={styles.totalSubValue}
              />
            </SkeletonPlaceholder>
          </View>
          {(!isHaveEnoughBalance || error) && (
            <>
              <Divider style={styles.divider} />
              <Text style={styles.error}>
                {`Insufficient balance, please buy some ${mainToken?.symbol} for gas fee` ||
                  (error?.response?.data as any)?.message}
              </Text>
            </>
          )}
        </View>
        <View>
          <Button
            disabled={!isValid || !isHaveEnoughBalance || isFetchingGas}
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
          >
            Send
          </Button>
        </View>
      </View>
      <GasFeeSelectorBottomSheet
        isOpen={isShowGasFeeSelector}
        onClose={() => setIsShowGasFeeSelector(false)}
        data={suggestedGasResponse?.data}
        setSuggestedGas={setSuggestedGas}
      />
    </SendTokenLayout>
  );
};

export default SendTokenConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  totalWrapper: {
    borderRadius: 8,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    marginTop: 16,
  },
  totalContent: {
    paddingHorizontal: 16,
    gap: 6,
  },
  divider: {
    marginVertical: 12,
  },
  totalTitle: {
    fontSize: 16,
    color: COLORS.gray24,
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
  totalLargeValue: {
    fontSize: 18,
    color: COLORS.gray24,
    fontWeight: "bold",
  },
  error: {
    fontSize: 14,
    color: COLORS.red5,
    textAlign: "right",
    paddingRight: 16,
  },
});
