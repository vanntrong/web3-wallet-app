import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Text, View } from "react-native-ui-lib";

import SeedInput from "../seedInput";

import EyeHiddenLargeIcon from "@/assets/icons/eye-hidden-large.svg";
import { COLORS } from "@/configs/colors";
import useBiometric from "@/hooks/useBiometric";
import { showToast } from "@/utils/toast";

const windowWidth = Dimensions.get("window").width;

interface Props {
  words: string[];
  handleWordChange?: (value: string, index: number) => void;
  editMode?: boolean;
  onShow?: () => void;
}

const SeedPhraseWords = ({
  words,
  onShow,
  editMode,
  handleWordChange,
}: Props) => {
  const [isHidden, setIsHidden] = useState(!editMode);

  const { requestAuthentication } = useBiometric();

  const requestShowSeed = async () => {
    const result = await requestAuthentication();
    if (result.success) {
      setIsHidden(false);
      return;
    }
    showToast({
      type: "failedToast",
      title: "Authentication failed",
    });
  };

  useEffect(() => {
    if (!isHidden) onShow?.();
  }, [isHidden, onShow]);

  return (
    <View style={styles.wrapper}>
      <FlatGrid
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        additionalRowStyle={{ paddingBottom: 0 }}
        itemDimension={windowWidth / 5}
        data={words}
        renderItem={({ item, index }) => (
          <SeedInput
            key={item}
            value={editMode ? item : `${index + 1}. ${item}`}
            readOnly={!editMode}
            handleSubmit={(value) => handleWordChange?.(value, index)}
          />
        )}
      />

      {isHidden && (
        <>
          <BlurView intensity={15} style={styles.blur} />
          <View style={styles.contentWrapper}>
            <Pressable
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={requestShowSeed}
            >
              <EyeHiddenLargeIcon />
              <Text style={styles.hintTitle}>
                Tap to reveal your seed phrase
              </Text>
              <Text style={styles.hintDescription}>
                Make sure no one is watching your screen.
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default SeedPhraseWords;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: COLORS.gray01,
    borderRadius: 8,
  },
  item: {
    minHeight: 40,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  blur: {
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 8,
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1,
  },
  contentWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 2,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  hintTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  hintDescription: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.gray0,
  },
});
