import IconButton from "@/components/iconButton";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import CloseSmallIcon from "@/assets/icons/close-small.svg";
import ProgressBarWithCounter from "@/components/progressBarWithCounter";
import { COLORS } from "@/configs/colors";

interface Props {
  icon?: React.ReactNode;
  progress: number;
  total: number;
}

const HeaderProgress = ({ icon, progress, total }: Props) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <IconButton onPress={router.back}>
        {icon ? icon : <CloseSmallIcon />}
      </IconButton>
      <ProgressBarWithCounter progress={progress} total={total} />
    </View>
  );
};

export default HeaderProgress;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  contentWrapper: {
    marginTop: 16,
    flex: 1,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
});
