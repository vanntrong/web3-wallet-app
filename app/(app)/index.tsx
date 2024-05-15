import { Redirect, useRouter } from "expo-router";
import React from "react";

import { useAuthStore } from "@/stores/globalStore";

const Screen = () => {
  const { user, accessToken } = useAuthStore();
  const router = useRouter();

  // return <Redirect href="/login" />;
  // if (!user && !accessToken) return <Redirect href="/(auth)/wallet-setup" />;
  // if (accessToken) return <Redirect href="/login" />;
  if (!user && !accessToken) {
    console.log("!user && !accessToken");
    router.replace("/wallet-setup");
    return null;
  }
  if (!user && accessToken) {
    router.replace("/login");
    return;
  }
  return <Redirect href="/wallet/" />;
};

export default Screen;
