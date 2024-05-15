import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ViewProps } from "react-native-ui-lib";

const windowHeight = Dimensions.get("window").height;

const AuthLayout = ({ children, style }: ViewProps) => {
  return (
    <SafeAreaView>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height: "100%",
    minHeight: windowHeight,
  },
});
