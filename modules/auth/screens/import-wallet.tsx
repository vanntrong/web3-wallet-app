import { zodResolver } from "@hookform/resolvers/zod";
import { BarcodeScanningResult } from "expo-camera/next";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native-ui-lib";

import useImportWallet from "../services/useImportWallet";
import {
  TImportWalletSchema,
  importWalletSchema,
} from "../validations/importWallet";

import EyeHidden from "@/assets/icons/eye-hidden.svg";
import EyeVisible from "@/assets/icons/eye-visble.svg";
import ScanIcon from "@/assets/icons/scan.svg";
import Button from "@/components/button";
import IconButton from "@/components/iconButton";
import Input from "@/components/input";
import LoginWithBiometric from "@/components/loginWithBiometric";
import QrCodeScanner from "@/components/qrCodeScanner";
import { COLORS } from "@/configs/colors";
import { localStoreKey } from "@/configs/localStore";
import useBiometric from "@/hooks/useBiometric";
import { useAuthStore } from "@/stores/globalStore";
import { setLocalStore } from "@/stores/localStore";

const inputs: {
  name: "mnemonic" | "password" | "confirmPassword";
  placeholder: string;
}[] = [
  {
    name: "mnemonic",
    placeholder: "Seed phrase",
  },
  {
    name: "password",
    placeholder: "New Password",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm password",
  },
];

const ImportWallet = () => {
  const router = useRouter();
  const { user, setAccessToken } = useAuthStore();
  const { mutate, isPending } = useImportWallet({
    async onSuccess(data, variables, context) {
      const { access_token } = data.data.data;
      await setLocalStore(localStoreKey.ACCESS_TOKEN, access_token);
      setAccessToken(access_token);
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/wallet/");
    }
  }, [user, router]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    clearErrors,
  } = useForm<TImportWalletSchema>({
    resolver: zodResolver(importWalletSchema),
    mode: "all",
    defaultValues: {
      confirmPassword: "",
      password: "",
      mnemonic: "",
    },
  });
  const { biometryType, generatePublickey } = useBiometric();

  const [visibilityState, setVisibilityState] = useState<
    Record<string, boolean>
  >({
    mnemonic: false,
    password: false,
    confirmPassword: false,
  });
  const [isShowScanner, setIsShowScanner] = useState(false);
  const [isEnableBiometric, setIsEnableBiometric] = useState(false);

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    const mnemonic = result.data;
    console.log({ mnemonic });
    if (mnemonic) {
      setValue("mnemonic", mnemonic);
      clearErrors("mnemonic");
    }

    setIsShowScanner(false);
  };

  const toggleVisibility = (field: keyof typeof visibilityState) => {
    setVisibilityState((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onSubmit = async (data: TImportWalletSchema) => {
    let biometricPublicKey: string | undefined = undefined;

    if (isEnableBiometric) {
      biometricPublicKey = await generatePublickey(
        true,
        `Authenticate with ${biometryType}`
      );
    }

    console.log({ biometricPublicKey });

    mutate({
      ...data,
      biometricPublicKey,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Import From Seed</Text>
          <View style={styles.inputList}>
            {inputs.map((_field) => (
              <Controller
                control={control}
                key={_field.name}
                name={_field.name}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    containerStyle={styles.inputContainer}
                    placeholder={_field.placeholder}
                    secureTextEntry={!visibilityState[_field.name]}
                    value={value}
                    onChangeText={onChange}
                    error={error?.message}
                    trailingAccessory={
                      <>
                        <IconButton
                          onPress={() => toggleVisibility(_field.name)}
                        >
                          {visibilityState[_field.name] ? (
                            <EyeHidden />
                          ) : (
                            <EyeVisible />
                          )}
                        </IconButton>
                        {_field.name === "mnemonic" && (
                          <IconButton onPress={() => setIsShowScanner(true)}>
                            <ScanIcon />
                          </IconButton>
                        )}
                      </>
                    }
                  />
                )}
              />
            ))}
            <LoginWithBiometric
              value={isEnableBiometric}
              onChange={setIsEnableBiometric}
              type={biometryType}
            />
          </View>
        </View>
        <View>
          <Button
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
          >
            Import
          </Button>
        </View>
      </View>
      <QrCodeScanner
        isVisible={isShowScanner}
        onClose={() => setIsShowScanner(false)}
        onBarcodeScanned={handleBarcodeScanned}
      />
    </SafeAreaView>
  );
};

export default ImportWallet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 50,
    flex: 1,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.gray24,
  },
  inputList: {
    gap: 16,
    marginTop: 16,
  },
  inputContainer: {
    paddingVertical: 12,
  },
});
