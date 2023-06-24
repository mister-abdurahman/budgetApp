import { createContext, useContext } from "react";
import { UserStore } from "./userStore";
import CommonStore from "./commonStore";
import AuthStore from "./authStore";
import BudgetStore from "./budgetStore";
import ExpenseStore from "./expenseStore";
import IncomeStore from "./IncomeStore";
import SavingsStore from "./savingsStore";

interface IStore {
  commonStore: CommonStore;
  authStore: AuthStore;
  userStore: UserStore;
  budgetStore: BudgetStore;
  expenseStore: ExpenseStore;
  incomeStore: IncomeStore;
  savingsStore: SavingsStore;
}

export const store: IStore = {
  commonStore: new CommonStore(),
  authStore: new AuthStore(),
  userStore: new UserStore(),
  budgetStore: new BudgetStore(),
  expenseStore: new ExpenseStore(),
  incomeStore: new IncomeStore(),
  savingsStore: new SavingsStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
