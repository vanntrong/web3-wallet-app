import { StyleSheet } from "react-native";
import { RadioButton, Text, TouchableOpacity, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";
import { TSuggestedGasFees, TSuggestedGasType } from "@/modules/gas/types";
import { formatNumber } from "@/utils/converter";

const gasSelectors = [
  {
    label: "Slow",
    key: "low",
  },
  {
    label: "Average",
    key: "medium",
  },
  {
    label: "Fast",
    key: "high",
  },
];

interface BasicGasSelectorProps {
  data?: TSuggestedGasFees | null;
  onItemClick?: (key: TSuggestedGasType) => void;
  selectedKey: TSuggestedGasType;
}

const BasicGasSelector = ({
  data,
  onItemClick,
  selectedKey,
}: BasicGasSelectorProps) => {
  const getSuggestedGas = (key: TSuggestedGasType) => {
    const baseFee = +(data?.estimatedBaseFee ?? 0);
    const suggestedMaxPriorityFeePerGas = +(
      data?.[key]?.suggestedMaxPriorityFeePerGas ?? 0
    );
    const value = baseFee + suggestedMaxPriorityFeePerGas;

    return value ? formatNumber(Number(value)) : "-";
  };

  return (
    <View style={{ gap: 12 }}>
      {gasSelectors.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => onItemClick?.(item.key as TSuggestedGasType)}
        >
          <View style={styles.gasSelectorItem}>
            <View>
              <Text style={styles.gasSelectorItemType}>{item.label}</Text>
              <Text style={styles.gasSelectorItemAmount}>
                {getSuggestedGas(item.key as TSuggestedGasType)} Gwei
              </Text>
            </View>
            <View>
              <RadioButton
                selected={selectedKey === item.key}
                color={COLORS.gray24}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gasSelectorItem: {
    backgroundColor: COLORS.white,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
  },
  gasSelectorItemType: { color: COLORS.gray12, fontSize: 16 },
  gasSelectorItemAmount: { color: COLORS.gray12, fontSize: 14, marginTop: 8 },
});

export default BasicGasSelector;
