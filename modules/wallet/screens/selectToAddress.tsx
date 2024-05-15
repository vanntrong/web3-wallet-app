import { BarcodeScanningResult } from "expo-camera/next";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import RecentCard from "../components/sendTokenBottomSheet/recentCard";
import ToAddressInput from "../components/sendTokenBottomSheet/toAddressInput";
import UserInfo from "../components/sendTokenBottomSheet/userInfo";
import SendTokenLayout from "../layouts/sendTokenLayout";
import { TSendTokenSchema } from "../validations/sendToken";

import Button from "@/components/button";
import QrCodeScanner from "@/components/qrCodeScanner";
import { COLORS } from "@/configs/colors";
import { showToast } from "@/utils/toast";
import { validateAddress } from "@/utils/validator";

const SelectToAddressScreen = () => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<TSendTokenSchema>();
  const toValue = watch("to");
  const router = useRouter();
  const [isShowScanner, setIsShowScanner] = useState(false);

  const handleNext = () => {
    router.push("/send-token/select-amount");
  };

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    let address = result.data;
    setIsShowScanner(false);
    if (address.includes(":")) {
      address = address.split(":")[1];
    }
    const isValidAddress = validateAddress(address);
    if (!isValidAddress) {
      showToast({
        title: "Invalid address",
        description: "Please enter a valid address",
        type: "failedToast",
        position: "top",
        topOffset: 80,
      });
      return;
    }
    setValue("to", address);
  };
  return (
    <>
      <SendTokenLayout title="Send Tokens">
        <UserInfo />
        <Controller
          control={control}
          name="to"
          render={({
            field: { value = "", onChange },
            fieldState: { error },
          }) => (
            <ToAddressInput
              value={value}
              setValue={(value) => onChange(value)}
              error={error?.message}
              onQrClick={() => setIsShowScanner(true)}
            />
          )}
        />

        <Text style={[styles.title, styles.recent]}>Recent</Text>
        <View style={styles.recentList}>
          <RecentCard />
          <RecentCard />
          <RecentCard />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            disabled={!!errors.to?.message || toValue.length === 0}
            onPress={handleNext}
          >
            Next
          </Button>
        </View>
      </SendTokenLayout>
      <QrCodeScanner
        isVisible={isShowScanner}
        onClose={() => setIsShowScanner(false)}
        onBarcodeScanned={handleBarcodeScanned}
      />
    </>
  );
};

export default SelectToAddressScreen;

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.gray24,
  },

  recent: {
    marginTop: 16,
  },
  recentList: {
    marginTop: 16,
    gap: 12,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignSelf: "center",
  },
});
