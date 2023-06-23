import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface IIncome {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const income: IIncome = {
  id: 0,
  description: "",
  amount: 0,
  date: "",
};

const dummyIncome = [
  {
    id: 1,
    name: "Salary",
    description: "my money",
    amount: 450000,
    date: "1-6-2020",
  },
  {
    id: 2,
    name: "Salary",
    description: "my money",
    amount: 450000,
    date: "23-01-2020",
  },
];

export default class IncomeStore {
  income: IIncome = income;
  incomes = new Map<number, IIncome>();

  constructor() {
    makeAutoObservable(this);
  }

  get incomeArrays() {
    if (store.commonStore.offline) {
      return Array.from(dummyIncome.values());
    } else {
      return Array.from(this.incomes.values());
    }
  }

  load_incomes = async () => {
    try {
      store.commonStore.setLoading(true);
      const incomes = await apiHandler.Incomes.list();

      incomes.forEach((income: IIncome) => {
        runInAction(() => {
          this.incomes.set(income.id, income);
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

  get_income_by_id = async (id: number) => {
    if (store.commonStore.offline) {
      this.income = dummyIncome.find((income) => income.id === id) || income;
    }

    try {
      store.commonStore.setLoading(true);
      this.income = await apiHandler.Incomes.detail(id);
      return this.income;
    } catch (error) {
      store.commonStore.setLoading(false);
      console.log(error);
    }
  };

  create_income = async (income: IIncome) => {
    try {
      store.commonStore.setLoading(true);
      income = await apiHandler.Incomes.create(income);

      runInAction(() => {
        this.incomes.set(income.id, income);
      });
      store.commonStore.setLoading(false);

      return this.income;
    } catch (error) {
      store.commonStore.setLoading(false);
      console.log(error);
    }
  };
}
