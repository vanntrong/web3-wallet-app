import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useEffect } from "react";
import { RSA } from "react-native-rsa-native";

import { localStoreKey } from "@/configs/localStore";
import { setLocalStore } from "@/stores/localStore";

const biometryTypeMap: Record<number, "None" | "Fingerprint" | "Face ID"> = {
  0: "None",
  1: "Fingerprint",
  2: "Face ID",
};

const useBiometric = () => {
  const [biometryType, setBiometryType] = React.useState<string>();

  const requestAuthentication = useCallback(
    (
      promptMessage = "Authenticate",
      options?: LocalAuthentication.LocalAuthenticationOptions
    ) => {
      return LocalAuthentication.authenticateAsync({
        promptMessage,
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
        ...options,
      });
    },
    []
  );

  const generatePublickey = useCallback(
    async (savePrivateKey?: boolean, prompt = "Authenticate") => {
      const keys = await RSA.generateKeys(2048);
      try {
        if (savePrivateKey) {
          const { success } = await requestAuthentication(prompt, {
            requireConfirmation: true,
          });

          if (!success) {
            alert("Authentication failed");
            return;
          }

          await setLocalStore(localStoreKey.PRIVATE_KEY, keys.private);
        }
        return keys.public;
      } catch (error) {
        console.log("error", error);
      }
    },
    [requestAuthentication]
  );

  const createSignature = useCallback(
    async (payload: any, privateKey: string) => {
      const signature = await RSA.sign(payload, privateKey);
      return signature;
    },
    []
  );

  useEffect(() => {
    const check = async () => {
      const level =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (level.length === 0) return;

      setBiometryType(biometryTypeMap[level[0]]);
    };
    check();
  }, []);

  return {
    biometryType,
    generatePublickey,
    createSignature,
    requestAuthentication,
  };
};

export default useBiometric;
