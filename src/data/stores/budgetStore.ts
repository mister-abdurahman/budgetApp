import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";
import { IIncome } from "./IncomeStore";
import { IExpense } from "./ExpenseStore";
import { ISavings } from "./SavingsStore";

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

const budget: IBudget = {
  id: 0,
  description: "",
  amount: 0,
  date: "",
};

const income: IIncome = {
  id: 0,
  description: "",
  amount: 0,
  date: "",
};

const expense: IExpense = {
  id: 0,
  description: "",
  amount: 0,
  date: "",
};

const saving: ISavings = {
  id: 0,
  description: "",
  amount: 0,
  date: "",
};

export default class BudgetStore {
  budget: IBudget = budget;
  budgets = new Map<number, IBudget>();
  income: IIncome = income
  expense: IExpense = expense
  saving: ISavings = saving
  incomes: IIncome[] = []
  expenses: IExpense[] = []
  savings: ISavings[] = []

  modal = false;

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
      store.commonStore.setLoading(true);
      const budgets = await apiHandler.Budgets.list();

      budgets.forEach((budget: IBudget) => {
        runInAction(() => {
          this.budgets.set(budget.id, budget);
        });
      });

      store.commonStore.setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        console.log(error.message);
        store.commonStore.setLoading(false);
      }
    }
  };

  get_budget_by_id = async (id: number) => {
    if (store.commonStore.offline) {
      this.budget = dummyBudget.find((budget) => budget.id === id) || budget;
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

  set_budget_modal = (state: boolean) => this.modal = state

  set_income = (newIncome: any) => { console.log(newIncome); this.income = newIncome}

  add_income = (income: any) => this.incomes.push(income)  
}
