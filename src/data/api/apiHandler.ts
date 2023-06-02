import axios, { AxiosResponse } from "axios";
import { ICollege } from "../stores/collegeStore";
import { IDepartment } from "../stores/departmentStore";
import { IProgram } from "../stores/programStore";
import { IUser } from "../stores/authStore";
import { IStudent } from "../stores/studentStore";
import { IStudentDocument, IStudentDocumentGroup } from "../stores/studentDocumentStore";


// axios.defaults.baseURL = "https://localhost:7151/api";
axios.defaults.baseURL = "https://api-fgbmfi-clone.azurewebsites.net/api";

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
    login: (username: string, password: string) => request.post<IUser | null>(`/users/login?username=${username}&password=${password}`, null),
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

/////////////////////
///// Students //////
/////////////////////
const Students = {
    list: (param?: string) => request.get<IStudent[]>(`/students?${param || ""}`),
    detail: (id: number) => request.get<IStudent>(`/students/${id}`),
    create: (student: IStudent) => request.post<IStudent>(`/students`, student),
    create_student_user: (student: IStudent) => request.post<IStudent>(`/users/create_student`, student),
    update: (id: string, student: IStudent) => request.post<IStudent>(`/students/${id}`, student),
    delete: (id: string) => request.delete<IStudent>(`/students/${id}`),
}

/////////////////////
///// Student Documents //////
/////////////////////
const StudentDocuments = {
    list: (param?: string) => request.get<IStudentDocument[]>(`/student_documents?${param || ""}`),
    list_by_user_id: (id: string) => request.get<IStudentDocumentGroup[]>(`/student_documents/by_user_id/${id}`),
    detail: (id: number) => request.get<IStudentDocument>(`/student_documents/${id}`),
    create: (studentDocument: IStudentDocument) => request.post<IStudentDocument>(`/student_documents`, studentDocument),
    update: (id: string, studentDocument: IStudentDocument) => request.post<IStudentDocument>(`/student_documents/${id}`, studentDocument),
    delete: (id: string) => request.delete<IStudentDocument>(`/student_documents/${id}`),
}

const apiHandler = {
    Users,
    Colleges,
    Departments,
    Programs,
    Students,
    StudentDocuments
}

export default apiHandler