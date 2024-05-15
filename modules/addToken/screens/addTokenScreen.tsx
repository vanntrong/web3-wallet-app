import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import { useDebounceValue } from "usehooks-ts";

import CustomToken from "../components/customToken";
import SearchToken from "../components/searchToken";
import { AddCustomTokenSchema } from "../validations/addCustomToken";

import LoadingScreen from "@/components/loadingScreen";
import Tabs from "@/components/tabs";
import { COLORS } from "@/configs/colors";
import { queryClient } from "@/configs/queryClient";
import useGetTokens from "@/modules/token/services/useGetTokens";
import { userQueryKey } from "@/modules/user/services/queryKey";
import { useImportToken } from "@/modules/user/services/useImportToken";
import { useNetworkStore, useTokenStore } from "@/stores/globalStore";

const windowHeight = Dimensions.get("window").height;

const AddTokenScreen = () => {
  const router = useRouter();
  const { currentNetwork } = useNetworkStore();
  const { otherTokens } = useTokenStore();

  const { mutate, isPending } = useImportToken({
    onSuccess: () => {
      if (currentNetwork) {
        queryClient.invalidateQueries({
          queryKey: userQueryKey.getMyTokens(currentNetwork?.id),
        });
      }
      router.dismiss();
    },
  });
  const excludeContractAddresses = useMemo(
    () => otherTokens.map((token) => token.contractAddress),
    [otherTokens]
  );

  const [keyword, setKeyword] = useDebounceValue("", 300);
  const { data: { data: tokensResponse } = {} } = useGetTokens(
    {
      keyword,
      networkId: currentNetwork?.id,
      excludeContractAddresses,
    },
    {
      enabled: !!currentNetwork?.id,
    }
  );

  const [selectedTokensAddress, setSelectedTokensAddress] = useState<string[]>(
    []
  );

  const handleSubmit = (data: AddCustomTokenSchema) => {
    if (!currentNetwork) return;
    mutate({
      contractAddresses: [data.contractAddress],
      networkId: currentNetwork.id,
    });
  };

  const handleAddMultipleToken = () => {
    if (!currentNetwork) return;
    mutate({
      networkId: currentNetwork.id,
      contractAddresses: selectedTokensAddress,
    });
  };

  const handleSelectToken = (tokenAddress: string) => {
    if (selectedTokensAddress.includes(tokenAddress)) {
      setSelectedTokensAddress(
        selectedTokensAddress.filter((item) => item !== tokenAddress)
      );
    } else {
      setSelectedTokensAddress([...selectedTokensAddress, tokenAddress]);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LoadingScreen visible={isPending} textContent="Importing..." />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Add Assets</Text>

        <View style={styles.container}>
          <Tabs
            items={[
              {
                label: "Search",
                component: (
                  <SearchToken
                    tokens={tokensResponse?.data}
                    onSearch={setKeyword}
                    selectedTokens={selectedTokensAddress}
                    setSelectedToken={handleSelectToken}
                    onClose={router.back}
                    isPending={isPending}
                    onAddMultiple={handleAddMultipleToken}
                  />
                ),
              },
              {
                label: "Custom Token",
                component: (
                  <CustomToken onSubmit={handleSubmit} isPending={isPending} />
                ),
              },
            ]}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddTokenScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: COLORS.appBackground,
    height: "100%",
    minHeight: windowHeight,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.gray24,
  },
  container: {
    flex: 1,
    marginTop: 48,
  },
});
