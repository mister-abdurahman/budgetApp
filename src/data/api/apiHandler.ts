import axios, { AxiosResponse } from "axios";
import { ICollege } from "../stores/collegeStore";
import { IDepartment } from "../stores/departmentStore";
import { IProgram } from "../stores/programStore";
import { IUser } from "../stores/authStore";


axios.defaults.baseURL = "https://localhost:7151/api";

const responseBody = (res: AxiosResponse) => res.data

const request = {
    get: <T>(url: string) => axios.get<T>(encodeURI(url)).then(responseBody),
    post: <T>(url: string, body: T) => axios.post<T>(encodeURI(url), body).then(responseBody),
    put: <T>(url: string, body: T) => axios.put<T>(encodeURI(url), body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(encodeURI(url)).then(responseBody)
}



//////////////////
///// Users //////
//////////////////
const Users = {
    list: (param?: string) => request.get<IUser[]>(`/users?${param || ""}`),
    detail: (id: string) => request.get<IUser>(`/users/${id}`),
    create: (user: IUser) => request.post<IUser>(`/users`, user),
    update: (id: string, user: IUser) => request.post<IUser>(`/users/${id}`, user),
    delete: (id: string) => request.delete<IUser>(`/users/${id}`),
}

/////////////////////
///// Colleges //////
/////////////////////
const Colleges = {
    list: (param?: string) => request.get<ICollege[]>(`/colleges?${param || ""}`),
    detail: (id: number) => request.get<ICollege>(`/colleges/${id}`),
    create: (college: ICollege) => request.post<ICollege>(`/colleges`, college),
    update: (id: string, college: ICollege) => request.post<ICollege>(`/colleges/${id}`, college),
    delete: (id: string) => request.delete<ICollege>(`/colleges/${id}`),
}

////////////////////////
///// Departments //////
////////////////////////
const Departments = {
    list: (param?: string) => request.get<IDepartment[]>(`/departments?${param || ""}`),
    detail: (id: number) => request.get<IDepartment>(`/departments/${id}`),
    create: (department: IDepartment) => request.post<IDepartment>(`/departments`, department),
    update: (id: string, department: IDepartment) => request.post<IDepartment>(`/departments/${id}`, department),
    delete: (id: string) => request.delete<IDepartment>(`/departments/${id}`),
}

/////////////////////
///// Programs //////
/////////////////////
const Programs = {
    list: (param?: string) => request.get<IProgram[]>(`/programs?${param || ""}`),
    detail: (id: number) => request.get<IProgram>(`/programs/${id}`),
    create: (program: IProgram) => request.post<IProgram>(`/programs`, program),
    update: (id: string, program: IProgram) => request.post<IProgram>(`/programs/${id}`, program),
    delete: (id: string) => request.delete<IProgram>(`/programs/${id}`),
}

const apiHandler = {
    Users,
    Colleges,
    Departments,
    Programs
}

export default apiHandler