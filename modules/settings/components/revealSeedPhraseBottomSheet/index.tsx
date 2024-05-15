import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, View } from "react-native-ui-lib";

import Input from "@/components/input";

const RevealSeedPhraseBottomSheet = () => {
  return (
    <BottomSheetModal>
      <View>
        <Text>Reveal Seed Phrase</Text>
        <Text>
          If you ever change browser or move computers, you will need this seed
          phrase to access your accounts. Save them somewhere safe and secret
        </Text>
        <View>
          <View />
          <View>
            <Text>
              <Text>DO NOT</Text>
              share this phrase with anymore! These words can be used to steal
              all your accounts
            </Text>
          </View>
        </View>
        <View>
          <Text>Enter password to continue</Text>
          <Input placeholder="Password" />
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default RevealSeedPhraseBottomSheet;
