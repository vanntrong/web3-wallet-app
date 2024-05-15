import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { TMainToken, TToken } from "@/modules/token/types";
import {
  TSendTokenSchema,
  sendTokenSchema,
} from "@/modules/wallet/validations/sendToken";
import { useNetworkStore, useTokenStore } from "@/stores/globalStore";

interface ISendTokenContext {
  networkId?: string;
  selectToken?: TToken | TMainToken;
  setSelectToken?: (token: TToken | TMainToken | undefined) => void;
}

const sendTokenContext = React.createContext<ISendTokenContext>({});
export const useSendTokenContext = () => useContext(sendTokenContext);

export const SendTokenProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: TToken;
}) => {
  const { currentNetwork } = useNetworkStore();
  const { mainToken } = useTokenStore();
  const [selectToken, setSelectToken] = useState<
    TToken | TMainToken | undefined
  >(token || mainToken || undefined);

  const methods = useForm<TSendTokenSchema>({
    resolver: zodResolver(sendTokenSchema),
    mode: "all",
    defaultValues: {
      amount: "",
      to: "",
    },
  });

  const value = useMemo(
    () => ({
      networkId: currentNetwork?.id,
      selectToken,
      setSelectToken,
    }),
    [currentNetwork, selectToken, setSelectToken]
  );

  return (
    <sendTokenContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </sendTokenContext.Provider>
  );
};
