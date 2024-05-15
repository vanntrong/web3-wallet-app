import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native-ui-lib";

import HeaderProgress from "../components/headerProgress";
import SeedPhraseBottomSheet from "../components/seedPhraseBottomSheet";

import ArrowLeftBack from "@/assets/icons/arrow-left-back.svg";
import Button from "@/components/button";
import { COLORS } from "@/configs/colors";
import AuthLayout from "@/layouts/AuthLayout";

export default function SecureYourWalletScreen() {
  const [isShowSheet, setIsShowSheet] = useState(false);
  return (
    <GestureHandlerRootView>
      <AuthLayout>
        <View style={styles.container}>
          <HeaderProgress icon={<ArrowLeftBack />} progress={2} total={3} />
          <View style={styles.contentWrapper}>
            <Text style={styles.headingText}>Secure Your Wallet</Text>
            <Image
              source={require("@/assets/secure-your-wallet.png")}
              style={styles.image}
            />
            <Text
              style={{
                fontSize: 16,
                marginTop: 60,
                lineHeight: 24,
              }}
            >
              <Text color={COLORS.gray12}>
                Don't risk losing your funds. protect your wallet by saving your
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "bold" }}
                onPress={() => setIsShowSheet(true)}
              >
                {" "}
                seed phrase{" "}
              </Text>
              <Text color={COLORS.gray12}>in a place you trust. </Text>
              <Text>
                It's the only way to recover your wallet if you get locked out
                of the app or get a new device.
              </Text>
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button variant="secondary">Remind Me Later</Button>
            <Link href="/create-a-wallet-seed-phrase" asChild>
              <Button>Start</Button>
            </Link>
          </View>
        </View>
      </AuthLayout>
      <SeedPhraseBottomSheet
        isOpen={isShowSheet}
        onClose={() => setIsShowSheet(false)}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    height: "100%",
    paddingBottom: 50,
    flex: 1,
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
  image: {
    maxWidth: 265,
    height: 190,
    objectFit: "contain",
    alignSelf: "center",
    marginTop: 60,
  },
  buttonWrapper: {
    gap: 16,
    position: "absolute",
    bottom: 50,
    width: "100%",
    paddingBottom: 50,
  },
});
