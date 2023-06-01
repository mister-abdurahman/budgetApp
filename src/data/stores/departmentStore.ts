import { makeAutoObservable } from "mobx";

export interface IDepartment {
    id: number,
    name: string,
    collegeId: number,
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
        collegeId: 1,
        name: "computer science",
        description: "computer science"
    },
    {
        id: 2,
        collegeId: 2,
        name: "computer engineering",
        description: "computer engineering"
    },
    {
        id: 3,
        name: "mathematics",
        collegeId: 1,
        description: "mathematics"
    },
    {
        id: 4,
        collegeId: 2,
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
        return Array.from(departments.values());
    }

    loadDepartments = async () => {
        departments.forEach(department => {
            this.departments.set(department.id, department)
        });
    }
}


