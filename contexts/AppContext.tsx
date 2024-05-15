import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

import { SOCKET_URL } from "@/configs/appConfig";
import { localStoreKey } from "@/configs/localStore";
import { useGetMe } from "@/modules/user/services/useGetMe";
import { useGetMyToken } from "@/modules/user/services/useGetMyToken";
import {
  useAuthStore,
  useNetworkStore,
  useTokenStore,
} from "@/stores/globalStore";
import { usePriceStore } from "@/stores/globalStore/priceStore";
import { setLocalStore } from "@/stores/localStore";
import { axiosInstance } from "@/utils/axios";
import { convertPriceFromPythNetwork } from "@/utils/converter";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentNetwork, setNetworks, setCurrentNetwork } = useNetworkStore();
  const { setMainToken, setOtherTokens, otherTokens, setIsLoading } =
    useTokenStore();
  const { setUser, user, accessToken } = useAuthStore();
  const { setPrice } = usePriceStore();
  const { data: getMyTokenResponse, isFetching } = useGetMyToken(
    currentNetwork?.id,
    {
      enabled: !!currentNetwork,
    }
  );
  const { data: getMeResponse } = useGetMe(accessToken, {
    enabled: !user && !!accessToken,
  });

  const connectionRef = useRef(
    new PriceServiceConnection("https://hermes.pyth.network")
  );

  useEffect(() => {
    if (!getMyTokenResponse?.data.data) return;
    const data = getMyTokenResponse.data.data;
    setMainToken(data.mainToken);
    setOtherTokens(data.otherTokens);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMyTokenResponse]);

  useEffect(() => {
    setIsLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  useEffect(() => {
    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, user]);

  useEffect(() => {
    if (!getMeResponse?.data?.data) return;
    const data = getMeResponse.data.data;
    setUser({
      ...data,
      name: data.name ?? "Anonymous",
    });
    setNetworks(data.networks);
    setCurrentNetwork(data.networks[0] ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMeResponse]);

  useEffect(() => {
    if (user) {
      setLocalStore(localStoreKey.USER_NAME, user.name);
      setLocalStore(localStoreKey.ADDRESS, user.address);
      setLocalStore(localStoreKey.USER_ID, user.id);
    }
  }, [user]);

  // useEffect(() => {
  //   // const timer = setInterval(() => {
  //   const connection = connectionRef.current;
  //   const priceIds = otherTokens
  //     .map((token) => token.priceFeedId)
  //     .filter((priceId) => priceId !== null);

  //   if (priceIds.length === 0) return;

  //   connection.subscribePriceFeedUpdates(priceIds as string[], (priceFeed) => {
  //     const price = convertPriceFromPythNetwork(
  //       priceFeed.getPriceUnchecked()?.price
  //     );
  //     const priceFeedId = priceFeed.id;
  //     if (price && priceFeedId) {
  //       setPrice(`0x${priceFeedId}`, price);
  //     } else {
  //       console.log("cannot get price for id: ", priceFeed.id, price);
  //     }
  //   });

  //   // When using the subscription, make sure to close the websocket upon termination to finish the process gracefully.
  //   // const timer = setTimeout(() => {
  //   //   connection.closeWebSocket();
  //   //   clearTimeout(timer);
  //   // }, 3000);
  //   // }, 3500);

  //   // return () => {
  //   //   clearInterval(timer);
  //   // };
  // }, [otherTokens, setPrice]);

  return children;
};
