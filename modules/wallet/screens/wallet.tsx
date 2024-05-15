import { AntDesign, Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import FloatingAddButtonLink from "../components/floatingAddButtonLink";
import HeaderInfo from "../components/headerInfo";
import MainTokenInfo from "../components/mainTokenInfo";
import NetworkSelectorBottomSheet from "../components/networkSelectorBottomSheet";
import ReceiveTokenBottomSheet from "../components/receiveTokenBottomSheet";
import TokenList from "../components/tokenList";

import Button from "@/components/button";
import Tabs from "@/components/tabs";
import { COLORS } from "@/configs/colors";
import WalletLayout from "@/layouts/WalletLayout";
import useUpdateMe from "@/modules/user/services/useUpdateMe";
import { useTokenStore } from "@/stores/globalStore";

const WalletScreen = () => {
  const [isShowNetworkSelector, setIsShowNetworkSelector] =
    useState<boolean>(false);
  const [isShowReceiveSheet, setIsShowReceiveSheet] = useState(false);
  const { otherTokens, isLoading } = useTokenStore();
  const { mutate: updateMe } = useUpdateMe();

  const handleSwitchNetwork = (networkId: string) => {
    updateMe({ selectedNetworkId: networkId });
  };

  return (
    <>
      <WalletLayout>
        <HeaderInfo onClickNetworkInfo={() => setIsShowNetworkSelector(true)} />
        <View style={styles.mainTokenWrapper}>
          <MainTokenInfo />
        </View>
        <View style={styles.buttonsWrapper}>
          <Link href="/send-token/select-to-address" asChild>
            <Button
              size="small"
              variant="secondary"
              style={styles.button}
              startIcon={
                <Feather name="send" size={20} color={COLORS.gray24} />
              }
            >
              Send
            </Button>
          </Link>
          <Button
            size="small"
            variant="secondary"
            style={styles.button}
            startIcon={
              <Feather
                name="arrow-down-circle"
                size={20}
                color={COLORS.gray24}
              />
            }
            onPress={() => setIsShowReceiveSheet(true)}
          >
            Receive
          </Button>
          <Button
            size="small"
            variant="secondary"
            style={[styles.button, { opacity: 0 }]}
            disabled
            startIcon={
              <AntDesign name="pay-circle-o1" size={20} color={COLORS.gray24} />
            }
          >
            Buy
          </Button>
        </View>
        <View
          style={{
            marginTop: 24,
            flex: 1,
            paddingBottom: 80,
          }}
        >
          <Tabs
            items={[
              {
                label: "Tokens",
                component: (
                  <TokenList tokens={otherTokens} isLoading={isLoading} />
                ),
              },
              {
                label: "Collectibles",
                component: (
                  <View>
                    <Text>collectibles</Text>
                  </View>
                ),
              },
            ]}
          />
        </View>
      </WalletLayout>

      <NetworkSelectorBottomSheet
        isOpen={isShowNetworkSelector}
        onClose={() => setIsShowNetworkSelector(false)}
        onSwitchNetwork={handleSwitchNetwork}
      />
      <ReceiveTokenBottomSheet
        isOpen={isShowReceiveSheet}
        onClose={() => setIsShowReceiveSheet(false)}
      />

      <FloatingAddButtonLink />
    </>
  );
};

export default memo(WalletScreen);

const styles = StyleSheet.create({
  mainTokenWrapper: {
    marginTop: 16,
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
});
