import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native-ui-lib";

import useLogin from "../services/useLogin";
import useLoginBiometric from "../services/useLoginBiometric";
import { TLoginSchema, loginSchema } from "../validations/login";

import EyeHidden from "@/assets/icons/eye-hidden.svg";
import EyeVisible from "@/assets/icons/eye-visble.svg";
import Button from "@/components/button";
import IconButton from "@/components/iconButton";
import Input from "@/components/input";
import { COLORS } from "@/configs/colors";
import { localStoreKey } from "@/configs/localStore";
import useBiometric from "@/hooks/useBiometric";
import { useAuthStore } from "@/stores/globalStore";
import { getLocalStore, setLocalStore } from "@/stores/localStore";
import { showToast } from "@/utils/toast";

const LoginScreen = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      password: "",
    },
  });
  const { user, setAccessToken } = useAuthStore();
  const { createSignature, biometryType, requestAuthentication } =
    useBiometric();

  const { mutate, isPending } = useLogin({
    onSuccess(data, variables, context) {
      const {
        tokens: { access_token },
      } = data.data.data;
      setAccessToken(access_token);
      setLocalStore(localStoreKey.ACCESS_TOKEN, access_token);
    },
  });
  const { mutate: loginBiometric, isPending: isPendingBiometric } =
    useLoginBiometric({
      onSuccess(data, variables, context) {
        const {
          tokens: { access_token },
        } = data.data.data;
        setAccessToken(access_token);
        setLocalStore(localStoreKey.ACCESS_TOKEN, access_token);
      },
    });

  const [userName, setUserName] = useState<string>();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onSubmit = async (data: TLoginSchema) => {
    const address = await getLocalStore(localStoreKey.ADDRESS);
    if (!address) {
      showToast({
        title: "There are some problems with your wallet. Please try again.",
        type: "failedToast",
        position: "top",
        topOffset: 120,
      });
      return;
    }
    mutate({
      password: data.password,
      address,
    });
  };

  const handleLoginBiometric = async () => {
    const userId = await getLocalStore(localStoreKey.USER_ID);

    const { success } = await requestAuthentication(
      `Login with ${biometryType}`,
      {
        requireConfirmation: true,
      }
    );
    if (!success) {
      alert("Authentication failed");
      return;
    }
    const privateKey = await getLocalStore(localStoreKey.PRIVATE_KEY);
    console.log({ privateKey });
    if (!userId || !privateKey) {
      showToast({
        title: `Please login before can use ${biometryType}`,
        type: "failedToast",
        position: "top",
        topOffset: 120,
      });
      return;
    }
    const signature = await createSignature(userId, privateKey);

    loginBiometric({
      signature,
      userId,
    });
  };

  useEffect(() => {
    getLocalStore(localStoreKey.USER_NAME).then((username) => {
      if (username) {
        setUserName(username);
      } else {
        setUserName("Guest");
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      router.push("/wallet/");
    }
  }, [user, router]);

  return (
    <ImageBackground
      source={require("@/assets/login-background.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.headerText}>Hello</Text>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                placeholder="Password"
                containerStyle={styles.input}
                secureTextEntry={!isShowPassword}
                floatOnFocus
                floatingPlaceholder
                value={value}
                onChangeText={onChange}
                error={error?.message}
                trailingAccessory={
                  <>
                    <IconButton onPress={toggleVisibility}>
                      {isShowPassword ? <EyeHidden /> : <EyeVisible />}
                    </IconButton>
                    <IconButton onPress={handleLoginBiometric}>
                      {biometryType === "Face ID" ? (
                        <MaterialCommunityIcons
                          color={COLORS.gray24}
                          name="face-recognition"
                          size={24}
                          style={{ marginLeft: 8 }}
                        />
                      ) : (
                        <FontAwesome6
                          name="fingerprint"
                          size={24}
                          color={COLORS.gray24}
                          style={{ marginLeft: 8 }}
                        />
                      )}
                    </IconButton>
                  </>
                }
              />
            )}
          />

          <Button
            style={styles.loginButton}
            size="small"
            disabled={!isValid}
            isLoading={isPending || isPendingBiometric}
            onPress={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.black,
    textAlign: "center",
  },
  userNameText: {
    fontSize: 40,
    fontWeight: "500",
    color: COLORS.black,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray24,
  },
  loginButton: {
    marginTop: 24,
  },
});

export default LoginScreen;
