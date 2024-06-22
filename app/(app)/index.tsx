import { Redirect, useRouter } from "expo-router";
import React from "react";

import { useAuthStore } from "@/stores/globalStore";

const Screen = () => {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();

  if (!user && !accessToken) {
    router.replace("/wallet-setup");
    return null;
  }
  if (!user && accessToken) {
    router.replace("/login");
    return null;
  }
  return <Redirect href="/wallet/" />;
};

export default Screen;
