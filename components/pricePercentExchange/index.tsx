import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

const IconIncrease = (
  <Feather name="arrow-up-right" size={20} color={COLORS.green6} />
);
const IconDecrease = (
  <Feather name="arrow-down-right" size={20} color={COLORS.red6} />
);

interface Props {
  percent: number;
}

const PricePercentExchange = ({ percent }: Props) => {
  const isIncrease = percent > 0;

  return (
    <View style={styles.wrapper}>
      {isIncrease ? IconIncrease : IconDecrease}
      <Text
        style={[
          styles.percent,
          isIncrease ? styles.percentIncrease : styles.percentDecrease,
        ]}
      >
        {percent}%
      </Text>
    </View>
  );
};

export default PricePercentExchange;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  percent: {
    fontSize: 16,
  },
  percentIncrease: {
    color: COLORS.green6,
  },
  percentDecrease: {
    color: COLORS.red6,
  },
});
