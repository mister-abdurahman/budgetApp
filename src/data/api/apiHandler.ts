import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { IUser } from "../stores/userStore";
import { IIncome } from "../stores/IncomeStore";
import { IExpense } from "../stores/expenseStore";
import { ISavings } from "../stores/savingsStore";
import { IBudget, ITotalBudget } from "../stores/budgetStore";
import { store } from "../stores/store";

// axios.defaults.baseURL = "https://localhost:7265/api/v1";
axios.defaults.baseURL = "https://api-fgbmfi-clone.azurewebsites.net/api/v1";

axios.interceptors.request.use((config) => {
  const access_token = store.commonStore.token

  if (access_token) {
    if (config.headers === undefined) {
      config.headers = { Authorization: `bearer ${access_token}`} as AxiosRequestHeaders;
    } 
    else { config.headers.Authorization = `Bearer ${access_token}` }
  }

  return config;
})

axios.interceptors.response.use((response) => response, (error: AxiosError) => {
  if (error.response?.status == 401) {
    localStorage.removeItem("cookie");
    localStorage.removeItem("token");
    store.commonStore.setAlert({
      type: "error",
      message: "session has expired"
    })
  }
  return Promise.reject(error);
});

const responseBody = (res: AxiosResponse) => res.data;

const request = {
  get: <T>(url: string) =>
    axios.get<T>(encodeURI(url)).then(responseBody),
  post: <T>(url: string, body: T) =>
    axios.post<T>(encodeURI(url), body).then(responseBody),
  put: <T>(url: string, body: T) =>
    axios.put<T>(encodeURI(url), body).then(responseBody),
  delete: <T>(url: string) =>
    axios.delete<T>(encodeURI(url)).then(responseBody),
};

//////////////////
///// Users //////
//////////////////
const Users = {
  list: (param?: string) => request.get<IUser[]>(`/users?${param || ""}`),
  detail: (id: string) => request.get<IUser>(`/users/${id}`),
  create: (user: IUser) => request.post<IUser>(`/users`, user),
  delete: (id: number) => request.delete<IUser>(`/users/${id}`),
  login: async (username: string, password: string) => {
    const data = await request.post<any>(
      `/users/login?username=${username}&password=${password}`,
      null
    )

    window.localStorage.setItem(
      "token",
      JSON.stringify(data.access_token)
    );

    return data
  }
};

//////////////////
///// Incomes //////
//////////////////
const Incomes = {
  list: (param?: string) => request.get<IIncome[]>(`/incomes?${param || ""}`),
  detail: (id: number) => request.get<IIncome>(`/incomes/${id}`),
  create: (income: IIncome) => request.post<IIncome>(`/incomes`, income),
  update: (id: string, income: IIncome) =>
    request.post<IIncome>(`/incomes/${id}`, income),
  delete: (id: number) => request.delete<IIncome>(`/incomes/${id}`),
};

//////////////////
///// Budgets //////
//////////////////
const Budgets = {
  list: (param?: string) => request.get<IBudget[]>(`/budgets?${param || ""}`),
  detail: (id: number) => request.get<IBudget>(`/budgets/${id}`),
  total_budget: () => request.get<ITotalBudget>(`/budgets/total_budget`),
  create: (budget: IBudget) => request.post<IBudget>(`/budgets`, budget),
  update: (id: string, budget: IBudget) =>
    request.post<IBudget>(`/budgets/${id}`, budget),
  delete: (id: number) => request.delete<IBudget>(`/budgets/${id}`),
};

//////////////////
///// Expenses //////
//////////////////
const Expenses = {
  list: (param?: string) => request.get<IExpense[]>(`/expenses?${param || ""}`),
  detail: (id: number) => request.get<IExpense>(`/expenses/${id}`),
  create: (expense: IExpense) => request.post<IExpense>(`/expenses`, expense),
  update: (id: string, expense: IExpense) =>
    request.post<IExpense>(`/expenses/${id}`, expense),
  delete: (id: number) => request.delete<IExpense>(`/expenses/${id}`),
};

//////////////////
///// Savings //////
//////////////////
const Savings = {
  list: (param?: string) => request.get<ISavings[]>(`/savings?${param || ""}`),
  detail: (id: number) => request.get<ISavings>(`/savings/${id}`),
  create: (saving: ISavings) => request.post<ISavings>(`/savings`, saving),
  update: (id: string, saving: ISavings) =>
    request.post<ISavings>(`/savings/${id}`, saving),
  delete: (id: number) => request.delete<ISavings>(`/savings/${id}`),
};

const apiHandler = {
  Users,
  Incomes,
  Budgets,
  Expenses,
  Savings,
};

export default apiHandler;
