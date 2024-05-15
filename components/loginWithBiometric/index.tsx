import React from "react";
import { StyleSheet } from "react-native";
import { Switch, Text, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  type?: string;
}

const LoginWithBiometric = ({
  value,
  onChange,
  type = "Biometrics",
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login with {type}?</Text>
      <Switch value={value} onValueChange={onChange} onColor={COLORS.gray24} />
    </View>
  );
};

export default LoginWithBiometric;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: COLORS.gray24,
  },
});
