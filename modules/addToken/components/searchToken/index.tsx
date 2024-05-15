import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import TokenSearchResult from "../tokenSearchResult";

import Button from "@/components/button";
import Input from "@/components/input";
import { COLORS } from "@/configs/colors";
import { TMainToken, TToken } from "@/modules/token/types";

interface Props {
  tokens?: (TToken | TMainToken)[];
  onSearch?: (text: string) => void;
  selectedTokens: string[];
  setSelectedToken: (tokenAddress: string) => void;
  onClose?: () => void;
  isPending?: boolean;
  onAddMultiple?: () => void;
  footerEnabled?: boolean;
}

const SearchToken = ({
  tokens,
  onSearch,
  selectedTokens,
  setSelectedToken: setSelectedTokens,
  isPending,
  onAddMultiple,
  onClose,
  footerEnabled = true,
}: Props) => {
  const { height } = useWindowDimensions();
  const isTokenSelected = (token: TToken | TMainToken) => {
    if (token.contractAddress) {
      return selectedTokens.includes(token.contractAddress);
    }
    return selectedTokens.includes(token.symbol);
  };

  const keyExtractor = (item: TToken | TMainToken) => {
    if ("id" in item) {
      return item.id;
    }
    return item.contractAddress ?? item.symbol;
  };

  return (
    <View style={{ flex: 1, height }}>
      <Input
        leadingAccessory={<AntDesign name="search1" size={16} color="black" />}
        containerStyle={styles.inputContainer}
        style={styles.input}
        onChangeText={onSearch}
      />

      <View
        style={[styles.mainContainer, !footerEnabled && { paddingBottom: 0 }]}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Select Tokens</Text>
          <View style={styles.tokensWrapper}>
            <FlatList
              style={[
                styles.flatListContent,
                !footerEnabled && { marginBottom: 60 },
              ]}
              contentContainerStyle={{ gap: 12 }}
              data={tokens}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    setSelectedTokens(item.contractAddress ?? item.symbol)
                  }
                >
                  <TokenSearchResult
                    token={item}
                    isSelected={isTokenSelected(item)}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

        {footerEnabled && (
          <View style={styles.buttonsWrapper}>
            <Button style={styles.button} variant="outline" onPress={onClose}>
              Cancel
            </Button>
            <Button
              style={styles.button}
              disabled={selectedTokens.length === 0}
              onPress={onAddMultiple}
            >
              Add Token
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchToken;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
  contentContainer: {
    marginTop: 24,
    flex: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.gray24,
  },
  tokensWrapper: {
    marginTop: 16,
  },
  flatListContent: {
    marginBottom: 140,
  },
  buttonsWrapper: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 68,
    backgroundColor: COLORS.appBackground,
    paddingVertical: 12,
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderColor: COLORS.gray24,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: "100%",
    fontWeight: "500",
  },
  button: {
    flex: 1,
  },
});
