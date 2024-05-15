import React, { useEffect, useMemo } from "react";
import { Text, View } from "react-native-ui-lib";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";

import PricePercentExchange from "@/components/pricePercentExchange";
import SkeletonPlaceholder from "@/components/skeletonPlaceholder";
import TextAnimation from "@/components/skeletonPlaceholder/textAnimation";
import { COLORS } from "@/configs/colors";
import { TToken } from "@/modules/token/types";
import { usePriceStore, useTokenStore } from "@/stores/globalStore";
import { formatNumber, formatPrice } from "@/utils/converter";
import { calculateBalance } from "@/utils/helper";

interface Props {
  token?: TToken;
}

const MainTokenInfo = ({ token }: Props) => {
  const { mainToken, isLoading } = useTokenStore();
  const { prices } = usePriceStore();

  const tokenInUsed = useMemo(() => token || mainToken, [token, mainToken]);

  const balance = useMemo(() => {
    if (tokenInUsed && tokenInUsed.balance) {
      const price = prices[tokenInUsed.priceFeedId || ""];
      console.log("price", price);
      console.log("balance", tokenInUsed.balance);
      return calculateBalance(tokenInUsed.balance, price);
    }
  }, []);

  return (
    <View>
      <View style={{ gap: 4, alignSelf: "flex-start" }}>
        <SkeletonPlaceholder
          isLoading={isLoading}
          skeleton={<TextAnimation height={24} />}
        >
          <Text
            style={{ fontSize: 28, fontWeight: "500", color: COLORS.gray24 }}
          >
            {formatNumber(tokenInUsed?.balance)} {tokenInUsed?.symbol}
          </Text>
        </SkeletonPlaceholder>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {!!balance && (
            <SkeletonPlaceholder
              skeleton={<TextAnimation width={70} />}
              isLoading={isLoading}
            >
              <Text style={{ fontSize: 16, color: COLORS.tokenPrice }}>
                {formatPrice(balance)}
              </Text>
            </SkeletonPlaceholder>
          )}
          {/* <SkeletonPlaceholder
            skeleton={<TextAnimation width={60} />}
            isLoading={isLoading}
          >
            <PricePercentExchange percent={9.3} />
          </SkeletonPlaceholder> */}
        </View>
      </View>
    </View>
  );
};

export default MainTokenInfo;
