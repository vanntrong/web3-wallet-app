import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import HeaderProgress from "../components/headerProgress";
import SeedPhraseWords from "../components/seedPhraseWords";

import ArrowLeftBack from "@/assets/icons/arrow-left-back.svg";
import Button from "@/components/button";
import IconButton from "@/components/iconButton";
import { COLORS } from "@/configs/colors";
import { useCreateWalletContext } from "@/contexts/CreateWalletContext";
import AuthLayout from "@/layouts/AuthLayout";

export const CreateAWalletSeedPhraseScreen = () => {
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const { mnemonic } = useCreateWalletContext();

  const mnemonicPhrase = mnemonic?.split(" ") || [];

  const handleCopySeed = async () => {
    if (!mnemonic) return;
    await Clipboard.setStringAsync(mnemonic);
  };
  return (
    <AuthLayout>
      <View style={styles.container}>
        <HeaderProgress icon={<ArrowLeftBack />} progress={2} total={3} />
        <View style={styles.contentWrapper}>
          <Text style={styles.headingText}>Write Down Your Seed Phrase</Text>
          <Text style={styles.descriptionText}>
            This is your seed phrase. Write it down on a paper and keep it in a
            safe place. You'll be asked to re-enter this phrase (in order) on
            the next step.
          </Text>
          <View style={{ marginTop: 32 }}>
            <SeedPhraseWords
              onShow={() => setIsDisabledButton(false)}
              words={mnemonicPhrase}
            />
            <IconButton
              style={{ alignSelf: "flex-end", marginTop: 20 }}
              onPress={handleCopySeed}
            >
              <Feather name="copy" size={24} color="black" />
            </IconButton>
          </View>
          <View style={styles.buttonWrapper}>
            <Link href="/create-a-wallet-confirm-phrase" asChild>
              <Button disabled={isDisabledButton}>Continue</Button>
            </Link>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    paddingBottom: 50,
    flex: 1,
  },
  contentWrapper: {
    marginTop: 16,
    flex: 1,
    height: "100%",
  },
  headingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  descriptionText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.gray12,
  },
  seedPhraseWrapper: {
    marginTop: 32,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});
