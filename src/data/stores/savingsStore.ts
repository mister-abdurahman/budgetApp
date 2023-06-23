import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface ISavings {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const dummySavings = [
  {
    id: 1,
    description: "my money",
    amount: 450000,
    date: "1-6-2020",
  },
  {
    id: 2,
    description: "my money",
    amount: 450000,
    date: "23-01-2020",
  },
];

const saving: ISavings = {
  id: 0,
  description: "",
  amount: 0,
  date: "",
};

export default class SavingsStore {
  saving: ISavings = saving;
  savings = new Map<number, ISavings>();

  constructor() {
    makeAutoObservable(this);
  }

  get savingsArrays() {
    if (store.commonStore.offline) {
      return Array.from(dummySavings.values());
    } else {
      return Array.from(this.savings.values());
    }
  }

  load_savings = async () => {
    try {
      store.commonStore.setLoading(true);
      const savings = await apiHandler.Savings.list();

      savings.forEach((saving: ISavings) => {
        runInAction(() => {
          this.savings.set(saving.id, saving);
        });
        store.commonStore.setLoading(false);
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setLoading(false);
        store.commonStore.setAlert({ type: "error", message: error.message });
        console.log(error.message);
      }
    }
  };

  get_savings_by_id = async (id: number) => {
    if (store.commonStore.offline) {
      this.saving = dummySavings.find((saving) => saving.id === id) || saving;
    }

    try {
      store.commonStore.setLoading(true);
      this.saving = await apiHandler.Savings.detail(id);
      store.commonStore.setLoading(false);
      return this.saving;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
        throw new Error(error.response.data);
      }
    }
  };

  create_savings = async (saving: ISavings) => {
    try {
      store.commonStore.setLoading(true);
      saving = await apiHandler.Savings.create(saving);

      runInAction(() => {
        this.savings.set(saving.id, saving);
      });
      store.commonStore.setLoading(false);
      return this.saving;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
        throw new Error(error.response.data);
      }
    }
  };

  delete_savings = async (savingId: number) => {
    try {
      store.commonStore.setLoading(true);
      await apiHandler.Savings.delete(savingId);

      runInAction(() => {
        this.savings.delete(savingId);
      });
      store.commonStore.setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
        throw new Error(error.response.data);
      }
    }
  };
}
