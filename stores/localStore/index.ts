import * as SecureStore from "expo-secure-store";

import { localStoreKey } from "@/configs/localStore";

const prefix = "_web3-wallet";

export const setLocalStore = async (
  key: string,
  value: string,
  options?: SecureStore.SecureStoreOptions
) => {
  return await SecureStore.setItemAsync(prefix + key, value, options);
};

export const getLocalStore = async (
  key: string,
  options?: SecureStore.SecureStoreOptions
): Promise<string | null> => {
  return await SecureStore.getItemAsync(prefix + key, options);
};

export const deleteLocalStore = async (key: string) => {
  return await SecureStore.deleteItemAsync(prefix + key);
};

export const clearLocalStore = async () => {
  return await Promise.all(
    Object.keys(localStoreKey).map((key) => deleteLocalStore(key))
  );
};
