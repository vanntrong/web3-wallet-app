import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text, TouchableOpacity, View } from "react-native-ui-lib";

import Button from "@/components/button";
import Input from "@/components/input";
import { COLORS } from "@/configs/colors";
import useGetTokenBalance from "@/modules/token/services/useGetTokenBalance";
import { TMainToken, TToken } from "@/modules/token/types";
import { useNetworkStore } from "@/stores/globalStore";
import { formatNumber } from "@/utils/converter";

interface Props {
  label: string;
  useMax?: boolean;
  onSelectTokenClick: () => void;
  readonly?: boolean;
  selectedToken?: TToken | TMainToken | null;
  value?: string;
  onValueChange?: (value: string) => void;
}

const SwapInput = ({
  label,
  useMax,
  readonly,
  onSelectTokenClick,
  selectedToken,
  value,
  onValueChange,
}: Props) => {
  const { currentNetwork } = useNetworkStore();
  const { data: { data } = {} } = useGetTokenBalance(
    {
      networkId: currentNetwork?.id,
      contractAddress: selectedToken?.contractAddress,
      tokenDecimal: selectedToken?.decimal,
    },
    {
      enabled: !!selectedToken && !!currentNetwork?.id,
    }
  );
  const handleUseMax = () => {
    if (!selectedToken) return;
    const balance = data?.data;
    if (!balance) return;
    onValueChange?.(balance.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>{label}</Text>
        {useMax && (
          <TouchableOpacity onPress={handleUseMax}>
            <Text style={styles.useMaxText}>Use Max</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="0"
          wrapperStyle={styles.inputWrapper}
          containerStyle={styles.inputContainerStyle}
          style={styles.inputField}
          inputMode="decimal"
          readonly={readonly}
          value={formatNumber(Number(value)).toString()}
          onChangeText={onValueChange}
          returnKeyType="done"
        />
        <Button
          variant="outline"
          style={{ flexShrink: 0 }}
          onPress={onSelectTokenClick}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {selectedToken && (
              <Avatar
                size={24}
                label={selectedToken.symbol}
                source={{ uri: selectedToken.thumbnail ?? undefined }}
              />
            )}
            <Text style={{ fontWeight: "500" }}>
              {selectedToken?.symbol ?? "Select token"}
            </Text>
            <Entypo name="chevron-down" size={20} color={COLORS.gray24} />
          </View>
        </Button>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: COLORS.gray12 }}>$0.00</Text>
        {selectedToken && (
          <Text style={{ color: COLORS.gray12 }}>
            {formatNumber(data?.data)} {selectedToken?.symbol}
          </Text>
        )}
      </View>
    </View>
  );
};

export default SwapInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.gray03,
  },
  useMaxText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.gray24,
  },
  inputContainer: {
    marginTop: 8,
    flexDirection: "row",
    gap: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingLeft: 0,
  },
  inputField: {
    fontSize: 32,
  },
});
