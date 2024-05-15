import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import BottomSheetModal from "@/components/bottomSheetModal";
import Button from "@/components/button";
import { COLORS } from "@/configs/colors";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const SeedPhraseBottomSheet = (props: Props) => {
  const snapPoints = useMemo(() => ["60%", "60%"], []);

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1) props.onClose?.();
    },
    [props]
  );

  return (
    <BottomSheetModal
      {...props}
      snapPoints={snapPoints}
      onChange={handleChange}
      animationConfigs={{
        duration: 150,
      }}
      viewStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>What is a 'Seed phrase'</Text>
      <Text style={styles.text}>
        A seed phrase is a set of twelve words that contains all the information
        about your wallet, including your funds. It's like a secret code used to
        access your entire wallet.
      </Text>
      <Text style={styles.text}>
        You must keep your seed phrase secret and safe. If someone gets your
        seed phrase, they'll gain control over your accounts.
      </Text>
      <Text style={styles.text}>
        Save it in a place where only you can access it. If you lose it, not
        even Cryptooly can help you recover it.
      </Text>
      <View style={styles.buttonWrapper}>
        <Button onPress={props.onClose}>I Got It</Button>
      </View>
    </BottomSheetModal>
  );

  // return (
  //   <BottomSheetModalProvider>
  //     <BottomSheetModal
  //       onChange={handleChange}
  //       animationConfigs={{
  //         duration: 150,
  //       }}
  //       backdropComponent={(props) => (
  //         <BottomSheetBackdrop {...props} opacity={0.6} onPress={onClose} />
  //       )}
  //       ref={bottomSheetRef}
  //       snapPoints={snapPoints}
  //     >
  //       <BottomSheetView style={styles.contentContainer}>
  //         <Text style={styles.heading}>What is a 'Seed phrase'</Text>
  //         <Text style={styles.text}>
  //           A seed phrase is a set of twelve words that contains all the
  //           information about your wallet, including your funds. It's like a
  //           secret code used to access your entire wallet.
  //         </Text>
  //         <Text style={styles.text}>
  //           You must keep your seed phrase secret and safe. If someone gets your
  //           seed phrase, they'll gain control over your accounts.
  //         </Text>
  //         <Text style={styles.text}>
  //           Save it in a place where only you can access it. If you lose it, not
  //           even Cryptooly can help you recover it.
  //         </Text>
  //         <View style={styles.buttonWrapper}>
  //           <Button onPress={onClose}>I Got It</Button>
  //         </View>
  //       </BottomSheetView>
  //     </BottomSheetModal>
  //   </BottomSheetModalProvider>
  // );
};
export default SeedPhraseBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.gray24,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: COLORS.gray12,
    marginBottom: 16,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
});
