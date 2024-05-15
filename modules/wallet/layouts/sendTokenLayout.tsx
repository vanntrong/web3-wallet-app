import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import Header from "../components/sendTokenBottomSheet/header";

import { COLORS } from "@/configs/colors";

interface Props {
  useHeader?: boolean;
  title: string;
}

const SendTokenLayout = ({
  useHeader,
  title,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <View style={styles.wrapper}>
      {useHeader ? (
        <Header title={title} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
      {children}
    </View>
  );
};

export default SendTokenLayout;

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.gray24,
  },
});
