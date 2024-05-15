import React from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Text, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

interface Props {
  label?: string | React.ReactNode;
  value: string | number | React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  valueAddon?: React.ReactNode;
}

const RowValue = ({
  label,
  value,
  labelStyle,
  valueStyle,
  containerStyle,
  valueAddon,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.valueWrapper}>
        <Text
          style={[styles.value, !label && styles.valueWithoutLabel, valueStyle]}
        >
          {value}
        </Text>
        {valueAddon}
      </View>
    </View>
  );
};

export default RowValue;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    color: COLORS.gray8,
  },
  value: {
    fontSize: 16,
    color: COLORS.gray24,
  },
  valueWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  valueWithoutLabel: {
    flex: 1,
    textAlign: "right",
  },
});
