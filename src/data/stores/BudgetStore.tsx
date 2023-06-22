import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface IBudget {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const dummyBudget = [
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

export default class BudgetStore {
  budget: IBudget | null = null;
  budgets = new Map<number, IBudget>();

  constructor() {
    makeAutoObservable(this);
  }

  get budgetArrays() {
    if (store.commonStore.offline) {
      return Array.from(dummyBudget.values());
    } else {
      return Array.from(this.budgets.values());
    }
  }

  load_budgets = async () => {
    try {
      const budgets = await apiHandler.Budgets.list();

      budgets.forEach((budget: IBudget) => {
        runInAction(() => {
          this.budgets.set(budget.id, budget);
        });
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        console.log(error.message);
      }
    }
  };

  get_budget_by_id = async (id: number) => {
    if (store.commonStore.offline) {
      this.budget = dummyBudget.find((budget) => budget.id === id) || null;
    }

    try {
      this.budget = await apiHandler.Incomes.detail(id);
      return this.budget;
    } catch (error) {
      console.log(error);
    }
  };

  create_budget = async (budget: IBudget) => {
    try {
      budget = await apiHandler.Budgets.create(budget);

      runInAction(() => {
        this.budgets.set(budget.id, budget);
      });

      return this.budget;
    } catch (error) {
      console.log(error);
    }
  };
}
