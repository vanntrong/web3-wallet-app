import { Stack } from "expo-router";
import React from "react";

import UpdateNameScreen from "@/modules/settings/screens/updateNameScreen";

const UpdateName = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Update Name",
        }}
      />
      <UpdateNameScreen />
    </>
  );
};

export default UpdateName;
