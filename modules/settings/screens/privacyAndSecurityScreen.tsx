import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import Button from "@/components/button";
import LoginWithBiometric from "@/components/loginWithBiometric";
import { COLORS } from "@/configs/colors";
import useBiometric from "@/hooks/useBiometric";

const PrivacyAndSecurityScreen = () => {
  const router = useRouter();
  const [isEnableBiometric, setIsEnableBiometric] = useState(false);
  const { biometryType } = useBiometric();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Security</Text>
        <Text style={styles.subHeading}>Protect your wallet</Text>
        <Text style={styles.description}>
          Protect your wallet by saving your seed phrase in various places like
          on a cryptooly of paper, password manager and/or the cloud
        </Text>
        <Button>Reveal Seed Phrase</Button>

        <View style={styles.spacer} />
        <Text style={styles.subHeading}>Password</Text>
        <Text style={styles.description}>
          Choose the amount of time before the application automatically locks
        </Text>
        <Button
          variant="secondary"
          onPress={() => router.push("/settings/update-password")}
        >
          Change Password
        </Button>

        <View style={styles.spacer} />
        <LoginWithBiometric
          value={isEnableBiometric}
          onChange={setIsEnableBiometric}
          type={biometryType}
        />
      </View>
    </View>
  );
};

export default PrivacyAndSecurityScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.gray24,
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 16,
    color: COLORS.gray24,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray14,
    marginBottom: 12,
  },
  spacer: {
    marginVertical: 16,
  },
});
