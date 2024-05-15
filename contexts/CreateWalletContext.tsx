import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  TCreateWalletSchema,
  createWalletSchema,
} from "@/modules/auth/validations/createWallet";

interface CreateWalletContext {
  mnemonic: string | null;
  setMnemonic: (mnemonic: string | null) => void;
}

const createWalletContext = React.createContext<CreateWalletContext>({
  mnemonic: null,
  setMnemonic: () => {},
});
export const useCreateWalletContext = () => useContext(createWalletContext);

export const CreateWalletProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mnemonic, setMnemonic] = React.useState<string | null>(null);
  const methods = useForm<TCreateWalletSchema>({
    resolver: zodResolver(createWalletSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const values = useMemo(
    () => ({
      mnemonic,
      setMnemonic,
    }),
    [mnemonic]
  );

  return (
    <createWalletContext.Provider value={values}>
      <FormProvider {...methods}>{children}</FormProvider>
    </createWalletContext.Provider>
  );
};
