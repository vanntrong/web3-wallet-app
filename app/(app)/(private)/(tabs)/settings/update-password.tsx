import { Stack } from "expo-router";
import React from "react";

import UpdatePasswordScreen from "@/modules/settings/screens/updatePasswordScreen";

const UpdateName = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Update Password",
        }}
      />
      <UpdatePasswordScreen />
    </>
  );
};

export default UpdateName;
