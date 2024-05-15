import { Slot } from "expo-router";
import React from "react";

import { SendTokenProvider } from "@/contexts/SendTokenContext";

const Layout = () => {
  return (
    <SendTokenProvider>
      <Slot />
    </SendTokenProvider>
  );
};

export default Layout;
