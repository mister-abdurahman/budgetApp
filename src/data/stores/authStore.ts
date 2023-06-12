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
    username: string;
    password?: string;
    roles?: string[]
}

export interface IUserRole {
    user: IUser;
    roles: string[];
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
        username: "jimparson",
    },
    {
        id: "Code-2",
        firstName: "Blessing",
        lastName: "Awogo",
        imageUrl: "https://avatars.githubusercontent.com/u/108867759?v=4",
        username: "blessco",

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
        let user: IUser | null = null
        if (store.commonStore.offline) {
            user = users.find(x => x.username === signIn.username.toLowerCase() && x.password === signIn.password.toLowerCase())!
            if (user) {
                localStorage.setItem("cookie", JSON.stringify({ user, token: store.commonStore.randomString() }))
            } else {
                store.commonStore.setAlert({ message: "invalid username or password", type: "error" })
            }
        } else {
            store.userStore.login(signIn.username, signIn.password)
                .then((user) => {
                    if (user) {
                        localStorage.setItem("cookie", JSON.stringify({ user, token: store.commonStore.randomString() }))
                    } else {
                        store.commonStore.setAlert({ message: "invalid username or password", type: "error" })
                    }
                });
        }
        
        console.log(this.user);
        

        return user;
    }

    loadPrograms = async () => {
        users.forEach(user => {
            this.users.set(user.id!, user)
        });
    }

    signOut = async () => {
        localStorage.removeItem("cookie");
        window.location.reload();
    }

    hasRole = (role: string) => {    
        return !!this.user?.roles?.find(x => x.toLowerCase() === role.toLowerCase())
    }
}


