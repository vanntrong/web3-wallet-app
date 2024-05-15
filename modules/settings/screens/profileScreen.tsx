import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text, View } from "react-native-ui-lib";

import Row from "../components/row";

import AssetPickerBottomSheetModal, {
  TAssetPickerResult,
} from "@/components/assetPickerBottomSheetModal";
import { COLORS } from "@/configs/colors";
import useUpdateMe from "@/modules/user/services/useUpdateMe";
import { useAuthStore } from "@/stores/globalStore";
import { getAvatarLabel } from "@/utils/converter";
import { showToast } from "@/utils/toast";

const ProfileScreen = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const { mutateAsync: updateMe } = useUpdateMe({
    onSuccess(data) {
      setUser(data.data.data);
    },
    onError() {
      showToast({
        type: "failedToast",
        title: "Failed to update profile",
        description: "Please try again later",
      });
    },
  });

  const [isShowAvatarPicker, setIsShowAvatarPicker] = useState(false);

  const handleTakeImage = async (image: TAssetPickerResult) => {
    const formData = new FormData();
    formData.append("avatar", image as any);
    updateMe(formData);
    setIsShowAvatarPicker(false);
  };

  if (!user) return null;

  return (
    <View style={{ flex: 1, marginTop: 12 }}>
      <View style={{ alignItems: "center", gap: 12 }}>
        <Avatar
          source={{ uri: user.avatar }}
          label={getAvatarLabel(user.name)}
          size={80}
          backgroundColor={COLORS.gray03}
          onPress={() => setIsShowAvatarPicker(true)}
        >
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              backgroundColor: COLORS.appBackground,
              padding: 4,
              borderRadius: 50,
            }}
          >
            <Feather name="camera" size={16} color="black" />
          </View>
        </Avatar>
      </View>
      <View style={{ marginTop: 32, paddingHorizontal: 16 }}>
        <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
        <View style={styles.sectionBody}>
          <Row
            label="Username"
            value="@johndoe"
            onPress={() => router.push("/settings/update-username")}
          />
          <Row
            label="Name"
            value={user.name}
            onPress={() => router.push("/settings/update-name")}
          />
          <Row label="Phone" value="(123) 456-7890" onPress={() => {}} />
          <Row
            label="Country"
            value="United States"
            onPress={() => {}}
            isLastRow
          />
        </View>
      </View>

      <View style={{ marginTop: 32, paddingHorizontal: 16 }}>
        <Text style={styles.sectionTitle}>LOGIN INFORMATION</Text>
        <View style={styles.sectionBody}>
          <Row
            label="Email"
            value={user.email}
            onPress={() => router.push("/settings/update-email")}
          />
          <Row
            label="Update password"
            onPress={() => router.push("/settings/update-password")}
            isLastRow
          />
        </View>
      </View>

      <AssetPickerBottomSheetModal
        isOpen={isShowAvatarPicker}
        onClose={() => setIsShowAvatarPicker(false)}
        onTakeImage={handleTakeImage}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  sectionTitle: {
    margin: 8,
    fontSize: 12,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 1,
  },
});
