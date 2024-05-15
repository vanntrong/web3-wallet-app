import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import BottomSheetModal from "@/components/bottomSheetModal";
import Tabs, { TabControllerRef } from "@/components/tabs";
import { COLORS } from "@/configs/colors";
import SearchToken from "@/modules/addToken/components/searchToken";
import { TMainToken, TToken } from "@/modules/token/types";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  type: "from" | "to";
  swapData: {
    from?: TToken | TMainToken;
    to?: TToken | TMainToken;
    amountIn?: string | undefined;
    amountOut?: string | undefined;
  };
  onSelectToken: (addressOrSymbol: string, type: "from" | "to") => void;
  tokens?: (TToken | TMainToken)[];
  onSearchToken?: (keyword: string) => void;
}

const SwapSelectTokenBottomSheet = ({
  type,
  swapData,
  onSelectToken,
  tokens,
  onSearchToken,
  ...props
}: Props) => {
  const snapPoints = useMemo(() => ["90%", "90%"], []);
  const tabRef = useRef<TabControllerRef>(null);

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1 && props.isOpen) {
        props.onClose?.();
      }
    },
    [props]
  );

  const fromSelectedToken = useMemo(() => {
    return swapData.from?.contractAddress || swapData.from?.symbol || "";
  }, [swapData.from]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tabRef.current) {
        tabRef.current?.setTab(type === "from" ? 0 : 1);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [type, tabRef]);

  return (
    <BottomSheetModal
      {...props}
      enableOverDrag={false}
      snapPoints={snapPoints}
      onChange={handleChange}
      handleStyle={{ backgroundColor: COLORS.appBackground }}
      animationConfigs={{
        duration: 150,
      }}
      viewStyle={{ flex: 1, backgroundColor: COLORS.appBackground }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Change Asset</Text>
        <View style={styles.spacer} />
        <Tabs
          ref={tabRef}
          items={[
            {
              label: "From",
              component: (
                <SearchToken
                  tokens={tokens}
                  selectedTokens={[fromSelectedToken]}
                  setSelectedToken={(addressOrSymbol) =>
                    onSelectToken(addressOrSymbol, type)
                  }
                  onClose={props.onClose}
                  onSearch={onSearchToken}
                  footerEnabled={false}
                />
              ),
            },
            {
              label: "To",
              component: (
                <SearchToken
                  tokens={tokens}
                  selectedTokens={[swapData.to?.contractAddress || ""]}
                  setSelectedToken={(addressOrSymbol) =>
                    onSelectToken(addressOrSymbol, type)
                  }
                  onClose={props.onClose}
                  onSearch={onSearchToken}
                  footerEnabled={false}
                />
              ),
            },
          ]}
        />
      </View>
    </BottomSheetModal>
  );
};

export default SwapSelectTokenBottomSheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.gray24,
  },
  spacer: {
    marginVertical: 16,
  },
});
