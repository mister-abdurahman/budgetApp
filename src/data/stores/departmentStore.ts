import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface IDepartment {
    id: number,
    name: string,
    departmentId: number,
    description: string,
}

export interface IProgram {
    id: number,
    name: string,
    departmentId: number
    description: string,
}

const departments = [
    {
        id: 1,
        departmentId: 1,
        name: "computer science",
        description: "computer science"
    },
    {
        id: 2,
        departmentId: 2,
        name: "computer engineering",
        description: "computer engineering"
    },
    {
        id: 3,
        name: "mathematics",
        departmentId: 1,
        description: "mathematics"
    },
    {
        id: 4,
        departmentId: 2,
        name: "electrical engineering",
        description: "electrical engineering"
    },

]


export default class DepartmentStore {
    department: IDepartment | null = null;
    departments = new Map<number, IDepartment>();

    constructor() {
        makeAutoObservable(this)
    }

    get departmentArrays(){
        if (store.commonStore.offline) {            
            return Array.from(departments.values());
        }else{
            return Array.from(this.departments.values());
        }
    }

    load_departments = async () => {

        try {
            const departments = await apiHandler.Departments.list();

            departments.forEach((department: IDepartment) => {
                runInAction(() =>{
                    this.departments.set(department.id, department)
                })
            })

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                console.log(error.message);                
            }
        }

    }

    get_department_by_id = async (id: number) => {

        if (store.commonStore.offline) {
            this.department = this.departmentArrays.find(department => department.id === id) || null
        }

        try {

            this.department = await apiHandler.Departments.detail(id);
            return this.department

        } catch (error) {
            console.log(error);
        }

    }

    create_department = async (department: IDepartment) => {
        try {

            department = await apiHandler.Departments.create(department);

            runInAction(() => {
                this.departments.set(department.id, department)
            })

            return this.department

        } catch (error) {
            console.log(error);
        }
    }
}


