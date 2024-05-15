import { Feather, Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  BarcodeScanningResult,
  Camera,
  CameraView,
  useCameraPermissions,
} from "expo-camera/next";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Modal, Text, View } from "react-native-ui-lib";

import IconButton from "../iconButton";

import { COLORS } from "@/configs/colors";

interface Props {
  isVisible?: boolean;
  onClose?: () => void;
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
}

const QrCodeScanner = ({ isVisible, onClose, onBarcodeScanned }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

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
        const scannedResults = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );

        const dataNeeded = scannedResults[0];
        onBarcodeScanned(dataNeeded);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBarCodeScanned = (data: BarcodeScanningResult) => {
    console.log("scanned", data);
    setScanned(true);
    onBarcodeScanned(data);
  };

  useEffect(() => {
    requestPermission();
  });

  useEffect(() => {
    if (!isVisible && scanned) setScanned(false);
  }, [isVisible, scanned]);

  if (!permission?.granted) {
    return null;
  }

  return (
    <Modal visible={isVisible} style={styles.container} animationType="slide">
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <IconButton onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </IconButton>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: COLORS.white,
                marginRight: 24,
              }}
            >
              Scan QR Code
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              position: "absolute",
              zIndex: 1,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 250,
                height: 250,
                borderWidth: 1,
                borderColor: COLORS.white,
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 2,
                  backgroundColor: COLORS.white,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              />
            </View>
            <Text style={styles.textSmall}>
              Scan the QR code in your camera
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <IconButton style={styles.button} onPress={openSelectFromLibrary}>
              <Feather name="image" size={18} color={COLORS.white} />
            </IconButton>
            <Text style={styles.textSmall}>Upload QR code</Text>
          </View>
        </SafeAreaView>
      </CameraView>
    </Modal>
  );
};

export default QrCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    zIndex: 9999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    margin: 64,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  textSmall: {
    fontSize: 14,
    marginTop: 12,
    color: COLORS.white,
  },
});
