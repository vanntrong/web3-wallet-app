import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import HeaderProgress from "../components/headerProgress";
import useSignUp from "../services/useSignUp";

import EyeHidden from "@/assets/icons/eye-hidden.svg";
import EyeVisible from "@/assets/icons/eye-visble.svg";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Input from "@/components/input";
import LoginWithBiometric from "@/components/loginWithBiometric";
import { COLORS } from "@/configs/colors";
import { useCreateWalletContext } from "@/contexts/CreateWalletContext";
import useBiometric from "@/hooks/useBiometric";
import AuthLayout from "@/layouts/AuthLayout";
import { TCreateWalletSchema } from "@/modules/auth/validations/createWallet";
import { useAuthStore } from "@/stores/globalStore";
import { axiosInstance } from "@/utils/axios";
import { checkPasswordStrong } from "@/utils/helper";

export default function CreateAWalletScreen() {
  const router = useRouter();
  const { setMnemonic } = useCreateWalletContext();
  const { setAccessToken } = useAuthStore();
  const { biometryType, generatePublickey } = useBiometric();
  const { mutate, isPending } = useSignUp({
    onSuccess(response) {
      const data = response.data.data;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token.access_token}`;
      setAccessToken(data.token.access_token);
      setMnemonic(data.mnemonic);
      router.push("/secure-your-wallet");
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<TCreateWalletSchema>();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isEnableBiometric, setIsEnableBiometric] = useState(false);

  const passwordValue = watch("password");

  const handleCreatePassword = async (data: TCreateWalletSchema) => {
    let biometricPublicKey: string | undefined = undefined;

    if (isEnableBiometric) {
      biometricPublicKey = await generatePublickey(
        true,
        `Authenticate with ${biometryType}`
      );
    }
    mutate({
      ...data,
      biometricPublicKey,
    });
  };

  const passwordStrength = useMemo(
    () => checkPasswordStrong(passwordValue),
    [passwordValue]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthLayout>
        <View style={styles.container}>
          <HeaderProgress progress={1} total={3} />
          <View style={styles.contentWrapper}>
            <Text style={styles.headingText}>Create Password</Text>
            <Text style={styles.descriptionText}>
              This password will unlock your Cryptooly wallet only on this
              service
            </Text>

            <View style={styles.formWrapper}>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { value, onChange, ref },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    ref={ref}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="name"
                render={({
                  field: { value, onChange, ref },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    value={value}
                    onChangeText={onChange}
                    ref={ref}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({
                  field: { value, onChange, ref },
                  fieldState: { error },
                }) => (
                  <Input
                    label="New password"
                    placeholder="Enter your password"
                    secureTextEntry={!isShowPassword}
                    value={value}
                    onChangeText={onChange}
                    ref={ref}
                    // error={error?.message}
                    trailingAccessory={
                      <TouchableOpacity
                        onPress={() => setIsShowPassword(!isShowPassword)}
                      >
                        {isShowPassword ? <EyeHidden /> : <EyeVisible />}
                      </TouchableOpacity>
                    }
                    belowElement={
                      <Text style={styles.hintText}>
                        Password strength:{" "}
                        <Text style={passwordStrengthMap[passwordStrength]}>
                          {passwordStrength}
                        </Text>
                      </Text>
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({
                  field: { value, onChange, ref },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Confirm password"
                    placeholder="Confirm your password"
                    secureTextEntry={!isShowConfirmPassword}
                    value={value}
                    onChangeText={onChange}
                    ref={ref}
                    error={error?.message}
                    trailingAccessory={
                      <TouchableOpacity
                        onPress={() =>
                          setIsShowConfirmPassword(!isShowConfirmPassword)
                        }
                      >
                        {isShowConfirmPassword ? <EyeHidden /> : <EyeVisible />}
                      </TouchableOpacity>
                    }
                    belowElement={
                      <Text style={styles.hintText}>
                        Must be at least 8 characters
                      </Text>
                    }
                  />
                )}
              />
              <LoginWithBiometric
                value={isEnableBiometric}
                onChange={setIsEnableBiometric}
                type={biometryType}
              />
            </View>
            <Controller
              name="checked"
              control={control}
              render={({
                field: { value, onChange, ref },
                fieldState: { error },
              }) => (
                <Checkbox
                  ref={ref}
                  value={value}
                  onValueChange={(value) => onChange(value)}
                  containerStyle={{ marginTop: 24 }}
                  label="I understand that Cryptooly cannot recover this password for me. Learn more"
                />
              )}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              disabled={!isValid || isPending}
              onPress={handleSubmit(handleCreatePassword)}
            >
              Create Password
            </Button>
          </View>
        </View>
      </AuthLayout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    flex: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  contentWrapper: {
    marginTop: 16,
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
  formWrapper: {
    marginTop: 24,
    gap: 16,
  },
  hintText: {
    fontSize: 12,
    color: COLORS.gray8,
  },
  buttonWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 50,
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  passwordWeak: {
    color: COLORS.red5,
  },
  passwordMedium: {
    color: COLORS.yellow4,
  },
  passwordGood: {
    color: COLORS.green6,
  },
});

const passwordStrengthMap: Record<string, any> = {
  Weak: styles.passwordWeak,
  Medium: styles.passwordMedium,
  Good: styles.passwordGood,
};
