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

export default class SavingsStore {
  saving: ISavings | null = null;
  savings = new Map<number, ISavings>();

  constructor() {
    makeAutoObservable(this);
  }

  get expenseArrays() {
    if (store.commonStore.offline) {
      return Array.from(dummySavings.values());
    } else {
      return Array.from(this.savings.values());
    }
  }

  load_savings = async () => {
    try {
      const savings = await apiHandler.Savings.list();

      savings.forEach((saving: ISavings) => {
        runInAction(() => {
          this.savings.set(saving.id, saving);
        });
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        console.log(error.message);
      }
    }
  };

  get_expense_by_id = async (id: number) => {
    if (store.commonStore.offline) {
      this.saving = dummySavings.find((saving) => saving.id === id) || null;
    }

    try {
      this.saving = await apiHandler.Savings.detail(id);
      return this.saving;
    } catch (error) {
      console.log(error);
    }
  };

  create_expense = async (saving: ISavings) => {
    try {
      saving = await apiHandler.Savings.create(saving);

      runInAction(() => {
        this.savings.set(saving.id, saving);
      });

      return this.saving;
    } catch (error) {
      console.log(error);
    }
  };
}
