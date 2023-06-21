import { createContext, useContext } from "react";
import { UserStore } from "./userStore";
import CommonStore from "./commonStore";
import AuthStore from "./authStore";

interface IStore {
  commonStore: CommonStore;
  authStore: AuthStore;
  userStore: UserStore;
}

export const store: IStore = {
  commonStore: new CommonStore(),
  authStore: new AuthStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
