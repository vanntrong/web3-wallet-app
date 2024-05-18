import { Router } from "expo-router";

export const resetRouter = (router: Router, path: any) => {
  while (router.canGoBack()) {
    router.back();
  }
  router.replace(path);
};
