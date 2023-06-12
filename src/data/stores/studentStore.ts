import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface IStudent {
    id: number
    firstName: string;
    lastName: string;
    imageUrl: string;
    userId: string;
    studentNumber: string;
    collegeCode: string;
    collegeName: string;
    departmentCode: string;
    departmentName: string;
    programCode: string;
    programName: string;
    username: string;
}


export default class StudentStore {
    student: IStudent = {
        id: 0,
        firstName: "",
        lastName: "",
        imageUrl: "",
        studentNumber: "",
        userId: "",
        collegeCode: "",
        collegeName: "",
        departmentCode: "",
        departmentName: "",
        programCode: "",
        programName: "",
        username: "",
    };
    students = new Map<number, IStudent>();

    constructor() {
        makeAutoObservable(this)
    }

    get studentArrays() {
        if (store.commonStore.offline) {
            return students;
        } else {
            return Array.from(this.students.values());
        }
    }

    load_students = async () => {

        try {
            store.commonStore.setLoading(true)
            const students = await apiHandler.Students.list();

            students.forEach((student: IStudent) => {
                runInAction(() => {
                    this.students.set(student.id, student)
                    store.commonStore.setLoading(false)
                })
            })

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }

    }

    get_student_by_id = async (id: number) => {
        try {
            store.commonStore.setLoading(true)
            this.student = await apiHandler.Students.detail(id);

            store.commonStore.setLoading(false)
            return this.student

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }

    }

    get_student_by_user_id = async (id: string) => {
        try {
            store.commonStore.setLoading(true)
            this.student = await apiHandler.Students.get_user_by_id(id);

            store.commonStore.setLoading(false)
            return this.student

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }

    }

    create_student = async (student: IStudent) => {
        try {
            store.commonStore.setLoading(true)
            student = await apiHandler.Students.create(student);

            runInAction(() => {
                this.students.set(student.id, student)
                store.commonStore.setLoading(false)
                store.commonStore.setAlert({ type: "success", message: "student created successfully" });
            })

            return this.student

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }
    }

    create_student_user = async (student: IStudent) => {
        try {
            store.commonStore.setLoading(true)
            student = await apiHandler.Students.create_student_user(student);

            runInAction(() => {
                this.students.set(student.id, student)
                store.commonStore.setLoading(false)
                store.commonStore.setAlert({ type: "success", message: "student created successfully" });
            })

            return this.student

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }
    }
}


export const students: IStudent[] = [
    {
        id: 1,
        firstName: "Jim",
        lastName: "Parson",
        imageUrl: "https://assets.gqindia.com/photos/5ec3a504d3f083a3607079f6/4:3/w_1440,h_1080,c_limit/Jim%20Parsons.jpg",
        studentNumber: "123-456-789",
        userId: "1",
        collegeCode: "",
        collegeName: "science and technology",
        departmentCode: "",
        departmentName: "",
        programCode: "",
        programName: "",
        username: "jimparson",
    },
    {
        id: 2,
        firstName: "Blessing",
        lastName: "Awogo",
        imageUrl: "https://avatars.githubusercontent.com/u/108867759?v=4",
        studentNumber: "CU-234-00002",
        userId: "1",
        collegeCode: "",
        collegeName: "engineering",
        departmentCode: "",
        departmentName: "",
        programCode: "",
        programName: "",
        username: "blessco",
    }
]