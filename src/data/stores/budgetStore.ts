import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";
import { IIncome } from "./IncomeStore";
import { IExpense } from "./expenseStore";
import { ISavings } from "./savingsStore";

export interface IBudget {
  id: number;
  description: string;
  amount: number;
  date: string;
  incomes?: IIncome[];
  expenses?: IExpense[];
  savings?: ISavings[];
}

export interface ITotalBudget {
  incomes: number;
  expenses: number;
  savings: number;
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

const total_budget: ITotalBudget = {
  incomes: 0,
  expenses: 0,
  savings: 0,
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
  total_budget: ITotalBudget = total_budget

  income: IIncome = income;
  expense: IExpense = expense;
  saving: ISavings = saving;
  incomes: IIncome[] = [];
  expenses: IExpense[] = [];
  savings: ISavings[] = [];

  availableFunds = 0;

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

  load_budgets = async (param?: string) => {
    try {
      store.commonStore.setLoading(true);
      const budgets = await apiHandler.Budgets.list(param);

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
      store.commonStore.setLoading(true);
      this.budget = await apiHandler.Budgets.detail(id);

      runInAction(() => {
        this.incomes = this.budget.incomes!                                                                                               
        this.expenses = this.budget.expenses!
        this.savings = this.budget.savings!
        store.commonStore.setLoading(false);
      })
      return this.budget;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
        throw new Error(error.response.data);
      }
    }
  };

  get_total_budget = async () => {
    try {
      store.commonStore.setLoading(true);
      this.total_budget = await apiHandler.Budgets.total_budget();

      store.commonStore.setLoading(false);
      return this.budget;
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
        throw new Error(error.response.data);
      }
    }
  };

  create_budget = async (budget: IBudget) => {
    try {
      store.commonStore.setLoading(true);

      budget.incomes = this.incomes;
      budget.expenses = this.expenses;
      budget.savings = this.savings;

      console.log(budget);

      budget = await apiHandler.Budgets.create(budget);

      runInAction(() => {
        this.budgets.set(budget.id, budget);
      });
      store.commonStore.setLoading(false);

      return this.budget;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        store.commonStore.setAlert({ type: "error", message: error.message });
        store.commonStore.setLoading(false);
        throw new Error(error.response.data);
      }
    }
  };

  delete_budget = async (budgetId: number) => {
    try {
      store.commonStore.setLoading(true);
      await apiHandler.Budgets.delete(budgetId);

      runInAction(() => {
        this.budgets.delete(budgetId);
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

  set_budget_modal = (state: boolean) => (this.modal = state);

  set_income = (newIncome: IIncome) => { this.income = newIncome }

  add_income = (income: IIncome) => { income.date = new Date().toJSON(); this.incomes.push(income) }

  remove_income = (index: any) => this.incomes.splice(index, 1)

  set_expense = (newExpense: IExpense) => { this.expense = newExpense }

  add_expense = (expense: IExpense) => { expense.date = new Date().toJSON(); this.expenses.push(expense) }

  remove_expense = (index: any) => this.expenses.splice(index, 1)

  set_saving = (newSaving: any) => { this.saving = newSaving }

  add_saving = (saving: any) => { saving.date = new Date().toJSON(); this.savings.push(saving) }

  remove_saving = (index: any) => this.savings.splice(index, 1)

  available_fund_calculation = () => {
    const income = this.incomes.reduce((accu, { amount }) => { return accu + amount }, 0)
    const expense = this.expenses.reduce((accu, { amount }) => { return accu + amount }, 0)

    this.availableFunds = income - expense

    return this.availableFunds;
  }

  saving_calculation = () => {
    const saving = this.savings.reduce((accu, { amount }) => { return accu + amount }, 0)
    return saving;
  }

  budget_calculation = () => {
    const saving = this.savings.reduce((accu, { amount }) => { return accu + amount }, 0)
    return this.available_fund_calculation() - saving;
  }
}
