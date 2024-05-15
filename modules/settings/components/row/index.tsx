import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { TouchableOpacity, Text, View } from "react-native-ui-lib";

interface Props extends TouchableOpacityProps {
  label: string;
  value?: string | React.ReactNode;
  onPress?: () => void;
  isLastRow?: boolean;
}

const Row = React.forwardRef<RNTouchableOpacity, Props>((props, ref) => {
  const { label, value, onPress, isLastRow, style, ...other } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.row, isLastRow && styles.rowLast, style]}
      ref={ref}
      {...other}
    >
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowSpacer} />
      <Text style={styles.rowValue}>{value}</Text>
      <Feather color="#bcbcbc" name="chevron-right" size={19} />
    </TouchableOpacity>
  );
});

export default Row;

const styles = StyleSheet.create({
  /** Row */
  row: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 12,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  rowLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ababab",
    marginRight: 4,
  },

  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    color: "#dc2626",
  },
});
