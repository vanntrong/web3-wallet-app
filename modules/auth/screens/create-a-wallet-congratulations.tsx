import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native-ui-lib";

import HeaderProgress from "../components/headerProgress";

import ArrowLeftBack from "@/assets/icons/arrow-left-back.svg";
import Button from "@/components/button";
import { COLORS } from "@/configs/colors";
import AuthLayout from "@/layouts/AuthLayout";

const CreateAWalletCongratulationScreen = () => {
  return (
    <AuthLayout>
      <View style={styles.container}>
        <HeaderProgress icon={<ArrowLeftBack />} progress={3} total={3} />
        <View style={styles.contentWrapper}>
          <Image source={require("@/assets/illus.png")} style={styles.image} />
          <View style={styles.contents}>
            <Text style={styles.heading}>Congratulations</Text>
            <Text style={styles.desc}>
              you've successfully protexted your wallet. Remember to keep your
              seed phrase safe, it's your responsibility!
            </Text>
            <Text style={styles.desc}>
              Cryptooly cannot recover your wallet should you lose it. You can
              find your seedphrase in
            </Text>
            <Text style={styles.headingSmall}>
              Setting &gt; Security & Privacy
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Link href="/wallet/" asChild>
              <Button>Continue</Button>
            </Link>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};

export default CreateAWalletCongratulationScreen;

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
  image: {
    alignSelf: "center",
    maxWidth: 255,
    objectFit: "contain",
    height: 165,
  },
  contents: {
    marginTop: 32,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray24,
    marginBottom: 8,
  },
  desc: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.gray12,
  },
  headingSmall: {
    fontWeight: "bold",
    color: COLORS.gray24,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});
