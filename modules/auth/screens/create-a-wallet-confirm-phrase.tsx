import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import HeaderProgress from "../components/headerProgress";
import SeedPhraseWords from "../components/seedPhraseWords";
import { validateSeedPhrase } from "../utils/validate";

import ArrowLeftBack from "@/assets/icons/arrow-left-back.svg";
import Button from "@/components/button";
import { COLORS } from "@/configs/colors";
import { useCreateWalletContext } from "@/contexts/CreateWalletContext";
import AuthLayout from "@/layouts/AuthLayout";

const CreateAWalletConfirmPhraseScreen = () => {
  const router = useRouter();
  const { mnemonic } = useCreateWalletContext();
  const [words, setWords] = useState<string[]>(new Array(12).fill(""));

  const handleWordChange = (word: string, index: number) => {
    const wordsClone = [...words];
    wordsClone[index] = word;
    setWords(wordsClone);
  };
  const isWordsValid = useMemo(() => {
    if (!mnemonic) return false;
    const wordsMerged = words.join(" ").trimEnd();
    return validateSeedPhrase(words) && wordsMerged === mnemonic;
  }, [words, mnemonic]);

  const handleNext = () => {
    router.push("/create-a-wallet-congratulations");
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <HeaderProgress icon={<ArrowLeftBack />} progress={3} total={3} />
        <View style={styles.contentWrapper}>
          <Text style={styles.headingText}>Confirm Seed Phrase</Text>
          <Text style={styles.descriptionText}>
            Please type each word in the right order
          </Text>
          <View style={{ marginTop: 32 }}>
            <SeedPhraseWords
              words={words}
              handleWordChange={handleWordChange}
              editMode
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button disabled={!isWordsValid} onPress={handleNext}>
              Continue
            </Button>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};

export default CreateAWalletConfirmPhraseScreen;

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
