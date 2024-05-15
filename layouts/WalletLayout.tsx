import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ViewProps } from "react-native-ui-lib";

const windowHeight = Dimensions.get("window").height;

interface Props extends ViewProps {
  withHeader?: boolean;
}

const WalletLayout = ({ children, style, withHeader }: Props) => {
  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          withHeader && styles.containerWithHeader,
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default WalletLayout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: "100%",
    minHeight: windowHeight,
    paddingTop: 24,
  },
  containerWithHeader: {
    paddingTop: 0,
  },
});
