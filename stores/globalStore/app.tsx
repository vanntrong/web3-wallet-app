import React, { createContext, useContext } from "react";

interface AppStore {
  refetchMyTokens: () => void;
  isRefetchingMyToken: boolean;
}

export const AppStoreContext = createContext<AppStore>({
  refetchMyTokens() {},
  isRefetchingMyToken: false,
});

export const AppStoreProvider = ({
  children,
  state,
}: {
  children: React.ReactNode;
  state: AppStore;
}) => {
  return (
    <AppStoreContext.Provider value={state}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStoreContext = () => useContext(AppStoreContext);
