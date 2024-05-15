import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import Button from "@/components/button";
import Input from "@/components/input";
import { COLORS } from "@/configs/colors";
import { formatNumber } from "@/utils/converter";

interface Props {
  defaultValue?: {
    maxPriorityFeePerGas?: string | null;
    baseFee?: string | null;
  } | null;
  setSuggestedGas: (data: {
    maxPriorityFeePerGas: string | null;
    baseFee: string | null;
  }) => void;
}

const AdvanceGasSelector = ({ defaultValue, setSuggestedGas }: Props) => {
  const [formValue, setFormValue] = useState<{
    maxPriorityFeePerGas?: string | null;
    baseFee?: string | null;
  }>({
    maxPriorityFeePerGas: defaultValue?.maxPriorityFeePerGas,
    baseFee: defaultValue?.baseFee,
  });

  const total = useMemo(() => {
    if (!formValue.baseFee || !formValue.maxPriorityFeePerGas) {
      return "-";
    }
    return formatNumber(
      Number(formValue.baseFee) + Number(formValue.maxPriorityFeePerGas),
      6
    );
  }, [formValue]);

  const handleSave = () => {
    if (!formValue.baseFee || !formValue.maxPriorityFeePerGas) {
      return;
    }
    setSuggestedGas({
      maxPriorityFeePerGas: formValue.maxPriorityFeePerGas,
      baseFee: formValue.baseFee,
    });
  };

  return (
    <View style={{ gap: 12, height: "100%" }}>
      <View
        style={[
          styles.row,
          {
            height: 40,
          },
        ]}
      >
        <Text style={styles.label}>Total</Text>
        <Text style={[styles.grow]}>{total} Gwei</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={styles.label}>Max Base Fee (Gwei)</Text>
        <Input
          wrapperStyle={[styles.grow]}
          placeholder="Gwei"
          containerStyle={{ height: 50 }}
          fieldStyle={{ flex: 1 }}
          inputMode="numeric"
          value={formValue.baseFee ?? ""}
          onChangeText={(value) => {
            setFormValue((v) => ({ ...v, baseFee: value }));
          }}
        />
      </View>
      <View style={[styles.row]}>
        <Text style={styles.label}>Max Priority Fee (Gwei)</Text>
        <Input
          wrapperStyle={[styles.grow]}
          placeholder="Gwei"
          containerStyle={{ height: 50 }}
          fieldStyle={{ flex: 1 }}
          inputMode="numeric"
          value={formValue.maxPriorityFeePerGas ?? ""}
          onChangeText={(value) => {
            setFormValue((v) => ({ ...v, maxPriorityFeePerGas: value }));
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 30,
        }}
      >
        <Button
          disabled={!formValue.baseFee || !formValue.maxPriorityFeePerGas}
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

export default AdvanceGasSelector;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: COLORS.gray12,
    width: 160,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  grow: {
    flexGrow: 1,
  },
});
