import { makeAutoObservable } from "mobx";
import { atom } from "nanostores";

export interface ISignIn {
    username: string;
    password: string;
}

export interface IUser {
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

const users = atom<IUser[]>([
    {
        firstName: "Jim",
        lastName: "Parson",
        imageUrl: "https://media.licdn.com/dms/image/C4D03AQHKNmB-w7WlGg/profile-displayphoto-shrink_800_800/0/1658915297053?e=1689206400&v=beta&t=SrF-hl453awu9qzOx5i0gC0I354qHH_gHQESnbQD_Ushttps://media.licdn.com/dms/image/C4D03AQHKNmB-w7WlGg/profile-displayphoto-shrink_800_800/0/1658915297053?e=1689206400&v=beta&t=SrF-hl453awu9qzOx5i0gC0I354qHH_gHQESnbQD_Us",
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
])


export const cookie = atom(localStorage.getItem("cookie"))
export const user = atom<IUser | null>(getUser())
export const token = atom(getToken())

function getToken() {
    return JSON.parse(cookie.get()!)?.token || null
}

function getUser() {
    return JSON.parse(cookie.get()!)?.user || null
}

export const handleUserSignIn = (signIn: ISignIn) => {
    const user = users.get().find(x => x.username === signIn.username && x.password === signIn.password)
    if (user) {

        localStorage.setItem("cookie", JSON.stringify({ user, token: Math.random().toString(36).substring(2, 20) }))
    }
    console.log(token.get());
}

export const signOut = () => localStorage.removeItem("cookie")

console.log(token.get());



//Mobx
export default class AuthStore {
    user: IUser | null = JSON.parse(localStorage.getItem("cookie")!)?.user
    signUp: IUser = {
        firstName: "",
        lastName: "",
        imageUrl: "",
        registrationNumber: "",
        matriculationNumber: "",
        collegeId: 0,
        college: "",
        departmentId: 0,
        department: "",
        programId: 0,
        program: "",
        username: "",
        password: ""
    }

    constructor() {
        makeAutoObservable(this)
    }

    get cookie() {
        return JSON.parse(localStorage.getItem("cookie")!);
    }

    handleUserSignIn = async (signIn: ISignIn) => {
        const user = users.get().find(x => x.username === signIn.username && x.password === signIn.password)
        if (user) {
            localStorage.setItem("cookie", JSON.stringify({ user, token: Math.random().toString(36).substring(2, 20) }))
        }
        return user;
    }

    handleUserSignUp = async (user: IUser) => {
        users.set([...users.get(),user])
        console.log(users.get());
        
        return user;
    }

    signOut = async () => {
        localStorage.removeItem("cookie");
        window.location.reload();
    }
}


