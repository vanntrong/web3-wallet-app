// App.jsx
import { AntDesign, Ionicons } from "@expo/vector-icons";
import RNToast, { ToastConfig } from "react-native-toast-message";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import { COLORS } from "@/configs/colors";

/*
  1. Create the config
*/
const toastConfig: ToastConfig = {
  successToast: ({ text1, props, text2 }) => (
    <TouchableOpacity
      style={{ width: "90%", alignItems: "center", bottom: 40 }}
      {...props}
    >
      <View
        style={{
          height: 60,
          width: "100%",
          borderWidth: 0,
          borderLeftWidth: 0,
          backgroundColor: COLORS.green2,
          alignItems: "center",
          flexDirection: "row",
          paddingLeft: 16,
          elevation: 0,
          shadowOpacity: 0,
          borderRadius: 8,
        }}
      >
        <AntDesign name="checkcircleo" size={25} color={COLORS.green4} />
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: COLORS.gray24,
            }}
          >
            {text1}
          </Text>
          {text2 && (
            <Text style={{ fontSize: 12, color: COLORS.gray12 }}>{text2}</Text>
          )}
        </View>
      </View>

      {/* <BlurView
        blurType="light"
        blurAmount={10}
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow: "hidden",
          backgroundColor: "transparent",
          zIndex: 100,
          borderRadius: 8,
        }}
      /> */}
    </TouchableOpacity>
  ),

  pendingToast: ({ text1, props, text2 }) => (
    <TouchableOpacity
      style={{ width: "90%", alignItems: "center", bottom: 40 }}
      {...props}
    >
      <View
        style={{
          height: 60,
          width: "100%",
          borderWidth: 0,
          borderLeftWidth: 0,
          backgroundColor: COLORS.yellow1,
          alignItems: "center",
          flexDirection: "row",
          paddingLeft: 16,
          elevation: 0,
          shadowOpacity: 0,
          borderRadius: 8,
        }}
      >
        <Ionicons name="timer-outline" size={25} color={COLORS.yellow4} />
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: COLORS.gray24,
            }}
          >
            {text1}
          </Text>
          {text2 && (
            <Text style={{ fontSize: 12, color: COLORS.gray12 }}>{text2}</Text>
          )}
        </View>
      </View>

      {/* <BlurView
        blurType="light"
        blurAmount={10}
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow: "hidden",
          backgroundColor: "transparent",
          zIndex: 100,
          borderRadius: 8,
        }}
      /> */}
    </TouchableOpacity>
  ),

  failedToast: ({ text1, props, text2 }) => (
    <TouchableOpacity
      style={{ width: "90%", alignItems: "center", bottom: 40 }}
      {...props}
    >
      <View
        style={{
          height: 60,
          width: "100%",
          borderWidth: 0,
          borderLeftWidth: 0,
          backgroundColor: COLORS.red1,
          alignItems: "center",
          flexDirection: "row",
          paddingLeft: 16,
          elevation: 0,
          shadowOpacity: 0,
          borderRadius: 8,
        }}
      >
        <Ionicons name="close-circle-outline" size={25} color={COLORS.red5} />
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: COLORS.gray24,
            }}
          >
            {text1}
          </Text>
          {text2 && (
            <Text style={{ fontSize: 12, color: COLORS.gray12 }}>{text2}</Text>
          )}
        </View>
      </View>

      {/* <BlurView
        blurType="light"
        blurAmount={10}
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow: "hidden",
          backgroundColor: "transparent",
          zIndex: 100,
          borderRadius: 8,
        }}
      /> */}
    </TouchableOpacity>
  ),
};

/*
  2. Pass the config as prop to the Toast component instance
*/

const Toast = () => {
  return <RNToast config={toastConfig} />;
};

export default Toast;
