import { useRouter } from "expo-router";
import { useCallback } from "react";

import { useAuthStore, useTokenStore } from "@/stores/globalStore";
import { clearLocalStore } from "@/stores/localStore";
import { resetRouter } from "@/utils/router";

const useLogout = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const { setMainToken, setOtherTokens } = useTokenStore();
  const router = useRouter();

  const logout = useCallback(async () => {
    // clear all local storage
    await clearLocalStore();
    resetRouter(router, "/wallet-setup/");
    // router.replace("/wallet-setup");
    setUser(null);
    setAccessToken(null);
    setMainToken(undefined);
    setOtherTokens([]);
  }, [router, setAccessToken, setUser, setMainToken, setOtherTokens]);

  return {
    logout,
  };
};

export default useLogout;
