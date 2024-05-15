import { Stack } from "expo-router";
import React from "react";

import TransactionScreen from "@/modules/settings/screens/transactionScreen";

const Screen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Transactions",
        }}
      />
      <TransactionScreen />
    </>
  );
};

export default Screen;
