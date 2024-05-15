import React from "react";
import { View } from "react-native-ui-lib";

import InputLabel from "../components/inputLabel";

import Button from "@/components/button";

const UpdateUsernameScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <InputLabel label="Username" />
        <Button style={{ marginTop: 16 }}>Save</Button>
      </View>
    </View>
  );
};

export default UpdateUsernameScreen;
