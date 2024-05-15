import { TNetwork } from "@/modules/network/types";

export type TUser = {
  id: string;
  address: string;
  name: string;
  email: string | null;
  avatar?: string;
  networks: TNetwork[];
  currentSelectedNetwork: TNetwork | null;
};
