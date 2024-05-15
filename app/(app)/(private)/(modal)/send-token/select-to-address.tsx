import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";

import { useSendTokenContext } from "@/contexts/SendTokenContext";
import SelectToAddressScreen from "@/modules/wallet/screens/selectToAddress";
import { useTokenStore } from "@/stores/globalStore";

const SelectToAddress = () => {
  const { token } = useLocalSearchParams();
  const { setSelectToken } = useSendTokenContext();
  const { getTokenById } = useTokenStore();
  console.log({ token });

  useEffect(() => {
    const _token = getTokenById(token as string);
    if (_token) {
      setSelectToken?.(_token);
    }
  }, [getTokenById, setSelectToken, token]);
  return (
    <>
      <SelectToAddressScreen />
    </>
  );
};

export default SelectToAddress;
