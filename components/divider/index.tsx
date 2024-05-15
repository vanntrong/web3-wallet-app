import React, { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

interface Props {
  height?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Divider = ({
  height = 1,
  backgroundColor = COLORS.gray0,
  style,
}: Props) => {
  const _style = useMemo(() => {
    return [
      styles.divider,
      {
        height,
        backgroundColor,
      },
      style,
    ];
  }, [height, backgroundColor, style]);

  return <View style={_style} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: "100%",
  },
});
