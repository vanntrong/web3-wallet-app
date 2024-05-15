import { COLORS } from "@/configs/colors";
import { getPercent } from "@/utils/helper";
import React from "react";
import { StyleSheet } from "react-native";
import { ProgressBar, Text, View } from "react-native-ui-lib";

interface Props {
  progress: number;
  total: number;
}

const ProgressBarWithCounter = ({ progress, total }: Props) => {
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={getPercent(progress / total)}
        progressColor={COLORS.black}
        style={{ backgroundColor: COLORS.gray01, flex: 1 }}
      />
      <Text style={styles.text}>
        {progress}/{total}
      </Text>
    </View>
  );
};

export default ProgressBarWithCounter;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", alignItems: "center", gap: 17 },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.black,
  },
});
