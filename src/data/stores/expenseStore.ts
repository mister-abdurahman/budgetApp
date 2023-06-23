import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface IExpense {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const expense: IExpense = {
  id: 0,
  description: "",
  amount: 0,
  date: "",
};

const dummyExpense = [
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

export default class ExpenseStore {
  expense: IExpense = expense;
  expenses = new Map<number, IExpense>();

  constructor() {
    makeAutoObservable(this);
  }

  get expenseArrays() {
    if (store.commonStore.offline) {
      return Array.from(dummyExpense.values());
    } else {
      return Array.from(this.expenses.values());
    }
  }

  load_expenses = async () => {
    try {
      store.commonStore.setLoading(true);
      const expenses = await apiHandler.Expenses.list();

      expenses.forEach((expense: IExpense) => {
        runInAction(() => {
          this.expenses.set(expense.id, expense);
        });
      });
      store.commonStore.setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setLoading(false);
        store.commonStore.setAlert({ type: "error", message: error.message });
        console.log(error.message);
      }
    }
  };

  get_expense_by_id = async (id: number) => {
    if (store.commonStore.offline) {
      this.expense =
        dummyExpense.find((expense) => expense.id === id) || expense;
    }

    try {
      store.commonStore.setLoading(true);
      this.expense = await apiHandler.Expenses.detail(id);
      store.commonStore.setLoading(false);
      return this.expense;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
        throw new Error(error.response.data);
      }
    }
  };

  create_expense = async (expense: IExpense) => {
    try {
      store.commonStore.setLoading(true);
      expense = await apiHandler.Expenses.create(expense);

      runInAction(() => {
        this.expenses.set(expense.id, expense);
      });
      store.commonStore.setLoading(false);

      return this.expense;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
        throw new Error(error.response.data);
      }
    }
  };

  delete_expense = async (expenseId: number) => {
    try {
      store.commonStore.setLoading(true);
      await apiHandler.Expenses.delete(expenseId);

      runInAction(() => {
        this.expenses.delete(expenseId);
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
