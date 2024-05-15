import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

import {
  AddCustomTokenSchema,
  addCustomTokenSchema,
} from "../../validations/addCustomToken";

import Button from "@/components/button";
import Input from "@/components/input";
import { COLORS } from "@/configs/colors";
import { useGetTokenInfoFromAddress } from "@/modules/token/services/useGetTokenInfoFromAddress";
import { useNetworkStore } from "@/stores/globalStore";

interface Props {
  onSubmit: (data: AddCustomTokenSchema) => void;
  isPending?: boolean;
}

const CustomToken = ({ onSubmit, isPending }: Props) => {
  const router = useRouter();
  const { currentNetwork } = useNetworkStore();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<AddCustomTokenSchema>({
    resolver: zodResolver(addCustomTokenSchema),
    mode: "all",
    defaultValues: {
      contractAddress: "",
    },
  });

  const contractAddressValue = watch("contractAddress");
  const { data: { data } = {} } = useGetTokenInfoFromAddress(
    {
      networkId: currentNetwork?.id,
      contractAddress: contractAddressValue,
    },
    {
      enabled:
        !!currentNetwork?.id &&
        !!contractAddressValue &&
        !errors.contractAddress?.message,
    }
  );

  const handleSubmitForm = (data: AddCustomTokenSchema) => {
    if (!currentNetwork) return;
    onSubmit(data);
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", paddingBottom: 80 }}
    >
      <View style={styles.inputList}>
        <Controller
          control={control}
          name="contractAddress"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              containerStyle={styles.inputContainer}
              style={styles.input}
              placeholder="Token contract address"
              floatingPlaceholder
              floatOnFocus
              value={value}
              onChangeText={onChange}
              error={error?.message}
            />
          )}
        />
        <Input
          containerStyle={styles.inputContainer}
          style={styles.input}
          placeholder="Token name"
          readOnly
          value={data?.data.name}
        />
        <Input
          containerStyle={styles.inputContainer}
          style={styles.input}
          placeholder="Token symbol"
          readOnly
          value={data?.data.symbol}
        />
        <Input
          containerStyle={styles.inputContainer}
          style={styles.input}
          placeholder="Token decimal"
          readOnly
          value={data?.data.decimal.toString()}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <Button style={{ flex: 1 }} variant="outline" onPress={router.back}>
          Cancel
        </Button>
        <Button
          style={{ flex: 1 }}
          disabled={!isValid}
          onPress={handleSubmit(handleSubmitForm)}
        >
          Add Token
        </Button>
      </View>
    </View>
  );
};

export default CustomToken;

const styles = StyleSheet.create({
  buttonsWrapper: {
    flexDirection: "row",
    gap: 16,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 0,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: "100%",
    fontWeight: "500",
  },
  inputList: {
    gap: 12,
  },
});
