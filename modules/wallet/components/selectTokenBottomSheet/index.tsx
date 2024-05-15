import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import Token from "../token";
import MainToken from "../token/mainToken";

import BottomSheetModal from "@/components/bottomSheetModal";
import { COLORS } from "@/configs/colors";
import { TMainToken, TToken } from "@/modules/token/types";
import { useTokenStore } from "@/stores/globalStore";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectToken?: (token: TToken | TMainToken) => void;
}

const SelectTokenBottomSheet = (props: Props) => {
  const { onSelectToken } = props;
  const snapPoints = useMemo(() => ["60%", "60%"], []);
  const { otherTokens, mainToken } = useTokenStore();

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
      handleStyle={{ backgroundColor: COLORS.appBackground }}
      viewStyle={{ backgroundColor: COLORS.appBackground, flex: 1 }}
      animationConfigs={{
        duration: 200,
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>Tokens</Text>

        {mainToken && (
          <TouchableOpacity
            onPress={() => onSelectToken?.(mainToken)}
            style={[{ marginTop: 16, flexGrow: 1, maxHeight: 72 }]}
          >
            <MainToken token={mainToken} showExchange={false} />
          </TouchableOpacity>
        )}
        <FlatList
          contentContainerStyle={styles.container}
          data={otherTokens}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectToken?.(item)}>
              <Token token={item} showExchange={false} />
            </TouchableOpacity>
          )}
        />
      </View>
    </BottomSheetModal>
  );
};

export default SelectTokenBottomSheet;

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 16, fontWeight: "bold", color: COLORS.gray24 },
  container: { gap: 12, marginTop: 16 },
});
