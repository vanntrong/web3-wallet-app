import React from "react";
import { View } from "react-native-ui-lib";

import InputLabel from "../components/inputLabel";

import Button from "@/components/button";

const UpdateEmailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <InputLabel label="Email" />
        <Button style={{ marginTop: 16 }}>Save</Button>
      </View>
    </View>
  );
};

export default UpdateEmailScreen;

// const styles = StyleSheet.create({
//   inputContainer: {
//     backgroundColor: COLORS.white,
//     borderRadius: 8,
//     borderWidth: 0,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   label: {
//     color: COLORS.gray24,
//     fontSize: 14,
//     fontWeight: "400",
//     marginBottom: 8,
//   },
// });
