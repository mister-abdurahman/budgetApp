import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import { store } from "./store";
import axios from "axios";

export const ROLES = {
  admin: "admin",
  student: "student",
  advisor: "advisor",
};

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  userName: string;
  password?: string;
}

export const user: IUser = {
  id: "",
  firstName: "",
  lastName: "",
  imageUrl: "",
  userName: "",
};

export class UserStore {
  user: IUser = user;
  users = new Map<string, IUser>();

  constructor() {
    makeAutoObservable(this);
  }

  get userArrays() {
    if (store.commonStore.offline) {
      return users;
    } else {
      return Array.from(this.users.values());
    }
  }

  load_users = async () => {
    this.users.clear();
    try {
      store.commonStore.setLoading(true);
      const users = await apiHandler.Users.list();

      users.forEach((user: IUser) => {
        runInAction(() => {
          this.users.set(user.id, user);
          store.commonStore.setLoading(false);
        });
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
      }
    }
  };

  get_user_by_id = async (id: string) => {
    if (store.commonStore.offline) {
      this.user = this.userArrays.find((user) => user.id === id) || user;
    }

    try {
      this.user = await apiHandler.Users.detail(id || "");
      return this.user;
    } catch (error) {
      console.log(error);
    }
  };

  create_user = async (user: IUser) => {
    try {
      store.commonStore.setLoading(true);
      user = await apiHandler.Users.create(user);

      runInAction(() => {
        this.users.set(user.id, user);
        store.commonStore.setLoading(false);
        store.commonStore.setAlert({
          type: "success",
          message: "user created successfully",
        });
      });

      return this.user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({
          type: "error",
          message: error.response.data,
        });
        store.commonStore.setLoading(false);
        throw new Error(error.message);
      }
    }
  };

  login = async (username: string, password: string) => {
    try {
      store.commonStore.setLoading(true);
      const user = await apiHandler.Users.login(username, password);

      runInAction(() => {
        this.users.set(user.id, user);
        store.commonStore.setLoading(false);
        store.commonStore.setAlert({
          type: "success",
          heading: "welcome back!",
        });
      });

      return user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
      }
    }
  };
}

export const users: IUser[] = [
  {
    id: "Code-1",
    firstName: "Jim",
    lastName: "Parson",
    imageUrl:
      "https://assets.gqindia.com/photos/5ec3a504d3f083a3607079f6/4:3/w_1440,h_1080,c_limit/Jim%20Parsons.jpg",
    userName: "jimparson",
  },
  {
    id: "Code-2",
    firstName: "Blessing",
    lastName: "Awogo",
    imageUrl: "https://avatars.githubusercontent.com/u/108867759?v=4",
    userName: "blessco",
  },
];
