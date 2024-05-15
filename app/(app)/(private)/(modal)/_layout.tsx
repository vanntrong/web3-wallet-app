import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TransitionPresets } from "@react-navigation/stack";
import React from "react";

import Toast from "@/components/toast";
import { COLORS } from "@/configs/colors";
import { JsStack } from "@/layouts/JsStack";

// Note: if not using the name `forModalPresentationIOS`, need to rename the function using something like `Object.defineProperty(Test, "name", {value: "forModalPresentationIOS"});`, as `react-navigation` has specific checks for the interpolator name.
// const forModalPresentationIOS = (
//   props: StackCardInterpolationProps
// ): StackCardInterpolatedStyle => {
//   const config =
//     TransitionPresets.ModalPresentationIOS.cardStyleInterpolator(props);
//   config.cardStyle.borderBottomLeftRadius = undefined;
//   config.cardStyle.borderBottomRightRadius = undefined;
//   return config;
// };

// const fixTabNestedStackCardStyleInterpolator = Platform.select({
//   ios: forModalPresentationIOS,
//   default: TransitionPresets.BottomSheetAndroid.cardStyleInterpolator,
// });

/**
 * Stack from expo-router with presentation modal not work for android, we need to use Stack from native-stack
 * https://github.com/expo/router/issues/640#issuecomment-2025301864
 */
const Layout = () => {
  return (
    // <BottomSheetModalProvider>
    <JsStack
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
        animationEnabled: true,
        cardStyle: {
          backgroundColor: COLORS.gray0,
          borderRadius: 0,
        },
        presentation: "transparentModal",
      }}
    >
      <JsStack.Screen
        name="send-token"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          gestureEnabled: true,
          // cardStyleInterpolator: fixTabNestedStackCardStyleInterpolator,
        }}
      />
      <JsStack.Screen
        name="add-token/index"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          gestureEnabled: true,
        }}
      />
    </JsStack>
    // <Toast />
    // </BottomSheetModalProvider>
  );
};

export default Layout;
