import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native-ui-lib";

import Button from "@/components/button";
import { COLORS } from "@/configs/colors";
import AuthLayout from "@/layouts/AuthLayout";

export default function WalletSetup() {
  return (
    <AuthLayout>
      <View style={styles.container}>
        <Image source={require("@/assets/wallet-setup-img.png")} />
        <View style={styles.contentWrapper}>
          <Text style={styles.contentHeading}>Wallet Setup</Text>
          <Text style={styles.content}>Import an existing wallet</Text>
          <Text style={styles.content}>or create a new one</Text>
        </View>
        <View style={styles.actionWrapper}>
          <Link href="/import-wallet" asChild>
            <Button variant="secondary">Import Using Seed Phare</Button>
          </Link>
          <Link href="/create-a-wallet" asChild>
            <Button>Create A New Wallet</Button>
          </Link>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingBottom: 50,
    flex: 1,
    height: "100%",
  },
  contentWrapper: {
    marginTop: 60,
    flex: 1,
  },
  contentHeading: {
    fontSize: 48,
    color: COLORS.gray24,
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
    color: COLORS.gray24,
  },
  actionWrapper: {
    marginTop: 72,
    gap: 16,
    flex: 2,
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
});
