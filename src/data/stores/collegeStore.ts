import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface ICollege {
    id: number,
    name: string,
    description: string,
}

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

const colleges = [
    {
        id: 1,
        name: "science and technology",
        description: "science and technology"
    },
    {
        id: 2,
        name: "engineering",
        description: "engineering"
    },
]


export default class CollegeStore {
    college: ICollege | null = null;
    colleges = new Map<number, ICollege>();

    constructor() {
        makeAutoObservable(this)
    }

    get collegeArrays(){
        if (store.commonStore.offline) {            
            return Array.from(colleges.values());
        }else{
            return Array.from(this.colleges.values());
        }
    }

    load_colleges = async () => {

        try {
            const colleges = await apiHandler.Colleges.list();

            colleges.forEach((college: ICollege) => {
                runInAction(() =>{
                    this.colleges.set(college.id, college)
                })
            })

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                console.log(error.message);                
            }
        }

    }

    get_college_by_id = async (id: number) => {

        if (store.commonStore.offline) {
            this.college = this.collegeArrays.find(college => college.id === id) || null
        }

        try {

            this.college = await apiHandler.Colleges.detail(id);
            return this.college

        } catch (error) {
            console.log(error);
        }

    }

    create_college = async (college: ICollege) => {
        try {

            college = await apiHandler.Colleges.create(college);

            runInAction(() => {
                this.colleges.set(college.id, college)
            })

            return this.college

        } catch (error) {
            console.log(error);
        }
    }
}


