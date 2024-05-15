import { Ionicons, AntDesign } from "@expo/vector-icons";
import React from "react";

import { TNetwork } from "@/modules/network/types";

type TabScreenOption = {
  name: string;
  title: string;
  icon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode;
  isDisabled?: (currentNetwork: TNetwork | null) => boolean;
};

export const privateTabs: TabScreenOption[] = [
  {
    name: "wallet",
    title: "Wallet",
    icon: (props) => <Ionicons name="wallet-outline" {...props} />,
  },
  {
    name: "swap/index",
    title: "Swap",
    icon: (props) => <AntDesign name="swap" {...props} />,
    isDisabled: (network) => !network!.networkSwap,
  },
  {
    name: "settings",
    title: "Settings",
    icon: (props) => <Ionicons name="settings-outline" {...props} />,
  },
];
