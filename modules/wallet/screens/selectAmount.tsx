import { Entypo } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Text, TextField, TouchableOpacity, View } from "react-native-ui-lib";

import SelectTokenBottomSheet from "../components/selectTokenBottomSheet";
import SendTokenLayout from "../layouts/sendTokenLayout";
import { TSendTokenSchema } from "../validations/sendToken";

import Button from "@/components/button";
import NumericPad from "@/components/numericPad";
import { COLORS } from "@/configs/colors";
import { useSendTokenContext } from "@/contexts/SendTokenContext";
import { TMainToken, TToken } from "@/modules/token/types";
import { useNetworkStore, useTokenStore } from "@/stores/globalStore";
import { formatNumber } from "@/utils/converter";

const SelectAmountScreen = () => {
  const router = useRouter();
  const { selectToken, setSelectToken } = useSendTokenContext();
  const { currentNetwork } = useNetworkStore();
  const { mainToken } = useTokenStore();
  const { watch, setValue } = useFormContext<TSendTokenSchema>();
  const [isShowSelectToken, setIsShowSelectToken] = useState(false);

  const tokenSymbol = useMemo(
    () => selectToken?.symbol || currentNetwork?.currentSymbol,
    [selectToken, currentNetwork]
  );

  const balance = useMemo(
    () => selectToken?.balance || mainToken?.balance,
    [selectToken, mainToken]
  );
  const amountValue = watch("amount");

  const isValidAmount = useMemo(
    () =>
      amountValue.length > 0 &&
      Number(amountValue) > 0 &&
      Number(amountValue) <= (balance || Number.NEGATIVE_INFINITY),
    [amountValue, balance]
  );

  const handleChangeAmount = useCallback(
    (value: string) => {
      setValue("amount", value);
    },
    [setValue]
  );

  const handleNext = () => {
    router.push("/send-token/confirm");
  };

  const handleSelectToken = (token: TToken | TMainToken) => {
    setSelectToken?.(token);
    setIsShowSelectToken(false);
  };

  const handleUseMax = () => {
    const balanceFormatted = formatNumber(balance);
    if (!balanceFormatted) return;
    setValue("amount", balanceFormatted.toString());
  };

  return (
    <BottomSheetModalProvider>
      <SendTokenLayout title="Amount" useHeader>
        <View style={styles.container}>
          <View>
            <Button
              variant="secondary"
              style={styles.selectToken}
              size="x-small"
              endIcon={
                <Entypo name="chevron-down" size={20} color={COLORS.gray24} />
              }
              onPress={() => setIsShowSelectToken(true)}
            >
              {tokenSymbol}
            </Button>
            <TouchableOpacity
              onPress={handleUseMax}
              style={styles.useMaxButton}
            >
              <Text style={styles.useMaxText}>Use Max</Text>
            </TouchableOpacity>
            <TextField
              value={amountValue}
              readOnly
              showSoftInputOnFocus={false}
              style={styles.amountInput}
            />

            <Text style={styles.balanceText}>
              Balance: {formatNumber(balance)} {tokenSymbol}
            </Text>
          </View>

          <View style={styles.amountPadWrapper}>
            <NumericPad
              buttonSize={60}
              activeOpacity={0.1}
              onValueChange={handleChangeAmount}
            />

            <Button
              style={{ marginTop: 8 }}
              disabled={!isValidAmount}
              onPress={handleNext}
            >
              Next
            </Button>
          </View>
        </View>
        <SelectTokenBottomSheet
          isOpen={isShowSelectToken}
          onClose={() => setIsShowSelectToken(false)}
          onSelectToken={handleSelectToken}
        />
      </SendTokenLayout>
    </BottomSheetModalProvider>
  );
};

export default SelectAmountScreen;

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flex: 1,
  },
  selectToken: {
    minWidth: 100,
    alignSelf: "center",
  },
  container: {
    marginTop: 16,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  amountInput: {
    alignSelf: "center",
    marginTop: 16,
    fontSize: 48,
    fontWeight: "500",
    color: COLORS.gray24,
  },
  balanceText: { textAlign: "center", fontSize: 14, color: COLORS.gray12 },
  amountPadWrapper: {
    marginTop: 32,
    width: "100%",
  },
  useMaxText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.gray24,
  },
  useMaxButton: {
    alignSelf: "center",
    marginTop: 12,
  },
});
