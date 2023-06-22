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
  expense: IExpense | null = null;
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
      const expenses = await apiHandler.Expenses.list();

      expenses.forEach((expense: IExpense) => {
        runInAction(() => {
          this.expenses.set(expense.id, expense);
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
      this.expense = dummyExpense.find((expense) => expense.id === id) || null;
    }

    try {
      this.expense = await apiHandler.Expenses.detail(id);
      return this.expense;
    } catch (error) {
      console.log(error);
    }
  };

  create_expense = async (expense: IExpense) => {
    try {
      expense = await apiHandler.Expenses.create(expense);

      runInAction(() => {
        this.expenses.set(expense.id, expense);
      });

      return this.expense;
    } catch (error) {
      console.log(error);
    }
  };
}
