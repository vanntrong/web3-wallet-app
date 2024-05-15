import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import Input from "@/components/input";
import { COLORS } from "@/configs/colors";

type Props = React.ComponentProps<typeof Input> & {
  label: string;
};

const InputLabel = ({ label, ...props }: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Input containerStyle={styles.inputContainer} {...props} />
    </View>
  );
};

export default InputLabel;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 0,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: COLORS.gray24,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 8,
  },
});
