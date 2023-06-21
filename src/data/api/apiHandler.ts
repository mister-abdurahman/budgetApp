import axios, { AxiosResponse } from "axios";
import { IUser } from "../stores/userStore";

// axios.defaults.baseURL = "https://localhost:7151/api";
axios.defaults.baseURL = "https://api-fgbmfi-clone.azurewebsites.net/api";

const responseBody = (res: AxiosResponse) => res.data;

const request = {
  get: <T>(url: string) => axios.get<T>(encodeURI(url)).then(responseBody),
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
  delete: (id: string) => request.delete<IUser>(`/users/${id}`),
  login: (username: string, password: string) =>
    request.post<IUser | null>(
      `/users/login?username=${username}&password=${password}`,
      null
    ),
};

const apiHandler = {
  Users,
};

export default apiHandler;
