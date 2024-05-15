import { Feather } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Text, View } from "react-native-ui-lib";

import BottomSheetModal from "@/components/bottomSheetModal";
import Button from "@/components/button";
import { COLORS } from "@/configs/colors";
import { TToken } from "@/modules/token/types";
import { useAuthStore, useTokenStore } from "@/stores/globalStore";
import { copyToClipboard } from "@/utils/clipboard";
import { formatContractAddress } from "@/utils/converter";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  token?: TToken;
}

const ReceiveTokenBottomSheet = (props: Props) => {
  const { token } = props;
  const { mainToken } = useTokenStore();
  const { user } = useAuthStore();
  const snapPoints = useMemo(() => ["60%", "60%"], []);

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1) props.onClose?.();
    },
    [props]
  );
  const handleCopy = async () => {
    if (!user) return;
    await copyToClipboard(user?.address);
  };

  return (
    <BottomSheetModal
      {...props}
      snapPoints={snapPoints}
      onChange={handleChange}
      handleStyle={{ backgroundColor: COLORS.appBackground }}
      viewStyle={{ backgroundColor: COLORS.appBackground, flex: 1 }}
      animationConfigs={{
        duration: 250,
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Receive {token?.symbol ?? mainToken?.symbol}
        </Text>
        <View style={styles.qrCodeWrapper}>
          <QRCode value={user?.address} size={200} />
        </View>
        <Text style={styles.scanQRDescription}>
          Scan address to Receive payment
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            variant="secondary"
            style={{ flex: 1 }}
            startIcon={<Feather name="copy" size={20} color="black" />}
            onPress={handleCopy}
          >
            {formatContractAddress(user?.address)}
          </Button>
          {/* <Button variant="secondary" style={{ flex: 1 }}>
            Share
          </Button> */}
        </View>
        {/* <Button>Send Link</Button> */}
      </View>
    </BottomSheetModal>
  );
};

export default ReceiveTokenBottomSheet;

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingHorizontal: 16, marginTop: 16 },
  title: { fontSize: 16, fontWeight: "bold", color: COLORS.gray24 },
  qrCodeWrapper: {
    marginTop: 12,
    padding: 16,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    maxWidth: "90%",
    width: "100%",
    alignSelf: "center",
    maxHeight: "50%",
    alignItems: "center",
  },
  scanQRDescription: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.gray12,
    alignSelf: "center",
  },
  buttonWrapper: {
    marginVertical: 16,
    flexDirection: "row",
    gap: 16,
  },
});
