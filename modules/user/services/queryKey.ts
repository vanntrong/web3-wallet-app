export const userQueryKey = {
  getMe: (accessToken: string | null) => ["me", accessToken],
  getMyTokens: (networkId = "") => ["MyTokens", networkId],
};
