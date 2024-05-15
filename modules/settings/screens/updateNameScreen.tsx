import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native-ui-lib";

import InputLabel from "../components/inputLabel";
import { TUpdateNameSchema, updateNameSchema } from "../validations/updateName";

import Button from "@/components/button";
import useUpdateMe from "@/modules/user/services/useUpdateMe";
import { useAuthStore } from "@/stores/globalStore";
import { extractName, mergeName } from "@/utils/helper";

const UpdateNameScreen = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const { mutate: updateMe, isPending } = useUpdateMe({
    onSuccess(data) {
      setUser(data.data.data);
      router.dismiss();
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TUpdateNameSchema>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: extractName(user?.name),
  });

  const onSubmit = (data: TUpdateNameSchema) => {
    updateMe({
      name: mergeName(data.firstName, data.lastName),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ gap: 12 }}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputLabel
                label="First name"
                error={error?.message}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <InputLabel
                label="Last name"
                error={error?.message}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <Button
          style={{ marginTop: 16 }}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

export default UpdateNameScreen;
