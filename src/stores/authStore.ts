import { makeAutoObservable } from "mobx";
import { atom } from "nanostores";
import { store } from "./store";

export interface ISignIn {
    username: string;
    password: string;
}

export interface IUser {
    id: string
    firstName: string;
    lastName: string;
    imageUrl: string;
    registrationNumber: string;
    matriculationNumber: string;
    collegeId: number;
    college: string;
    departmentId: number;
    department: string;
    programId: number;
    program: string;
    username: string;
    password: string;
}

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

export const users: IUser[] = [
    {
        id: "Code-1",
        firstName: "Jim",
        lastName: "Parson",
        imageUrl: "https://assets.gqindia.com/photos/5ec3a504d3f083a3607079f6/4:3/w_1440,h_1080,c_limit/Jim%20Parsons.jpg",
        registrationNumber: "123-456-789",
        matriculationNumber: "CU-234-00001",
        collegeId: 1,
        college: "science and technology",
        departmentId: 1,
        department: "",
        programId: 1,
        program: "",
        username: "jimparson",
        password: "password"
    },
    {
        id: "Code-2",
        firstName: "Blessing",
        lastName: "Awogo",
        imageUrl: "https://avatars.githubusercontent.com/u/108867759?v=4",
        registrationNumber: "123-456-710",
        matriculationNumber: "CU-234-00002",
        collegeId: 1,
        college: "engineering",
        departmentId: 1,
        department: "",
        programId: 1,
        program: "",
        username: "blessco",
        password: "password"
    }
]


export const cookie = atom(localStorage.getItem("cookie"))
export const user = atom<IUser | null>(getUser())
export const token = atom(getToken())

function getToken() {
    return JSON.parse(cookie.get()!)?.token || null
}

function getUser() {
    return JSON.parse(cookie.get()!)?.user || null
}

export const signOut = () => localStorage.removeItem("cookie")

//Mobx
export default class AuthStore {
    user: IUser | null = JSON.parse(localStorage.getItem("cookie")!)?.user
    users = new Map<string, IUser>();

    constructor() {
        makeAutoObservable(this)
    }

    get userArrays() {
        return Array.from(users.values());
    }

    get cookie() {
        return JSON.parse(localStorage.getItem("cookie")!);
    }

    handleUserSignIn = async (signIn: ISignIn) => {
        const user = users.find(x => x.username === signIn.username.toLowerCase() && x.password === signIn.password.toLowerCase())
        if (user) {
            localStorage.setItem("cookie", JSON.stringify({ user, token: store.commonStore.randomString() }))
        }else{
            store.commonStore.setAlert({message: "invalid username or password", type: "error"})   
        }
        return user;
    }

    loadPrograms = async () => {
        users.forEach(user => {
            this.users.set(user.id!, user)
        });
    }

    handleUserSignUp = async (user: IUser) => {
        this.users.set(Math.random().toString(36).substring(2, 20), user)
        console.log(users);

        return user;
    }

    signOut = async () => {
        localStorage.removeItem("cookie");
        window.location.reload();
    }
}


