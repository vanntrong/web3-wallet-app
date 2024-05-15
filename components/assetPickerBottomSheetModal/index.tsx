import { Feather, Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import BottomSheetModal from "../bottomSheetModal";

import { COLORS } from "@/configs/colors";
import { getRandomImageName } from "@/utils/helper";

export type TAssetPickerResult = {
  uri: string;
  name: string;
  type: string;
};

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  onTakeImage: (data: TAssetPickerResult) => void;
}

const AssetPickerBottomSheetModal = (props: Props) => {
  const { onTakeImage } = props;
  const snapPoints = useMemo(() => ["20%", "20%"], []);

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1 && props.isOpen) {
        props.onClose?.();
      }
    },
    [props]
  );

  const openSelectFromLibrary = async () => {
    // pick an image from gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // if the user successfully picks an image then we check if the image has a QR code
    if (result && result.assets?.[0].uri) {
      try {
        const fileExtension = result.assets[0].uri.split(".").pop();
        const data: TAssetPickerResult = {
          uri: result.assets[0].uri,
          name:
            result.assets[0].fileName ??
            `${getRandomImageName()}.${fileExtension}`,
          type: result.assets[0].mimeType ?? `image/${fileExtension}`,
        };
        onTakeImage(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const takePicture = async () => {
    // const picture = Camera.
  };

  return (
    <BottomSheetModal
      {...props}
      enablePanDownToClose
      enableOverDrag
      snapPoints={snapPoints}
      onChange={handleChange}
    >
      <View>
        <TouchableOpacity style={styles.button} onPress={openSelectFromLibrary}>
          <View style={styles.buttonView}>
            <Feather name="image" size={18} color={COLORS.gray24} />
            <Text style={styles.buttonText}>Gallery</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonView}>
            <Feather name="camera" size={18} color={COLORS.gray24} />
            <Text style={styles.buttonText}>Take a photo</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default AssetPickerBottomSheetModal;

const styles = StyleSheet.create({
  button: {
    padding: 16,
  },
  buttonView: { flexDirection: "row", alignItems: "center", gap: 8 },
  buttonText: { fontSize: 16, color: COLORS.gray24 },
});
