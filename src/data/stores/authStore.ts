import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { IUser, user } from "./userStore";

export interface ISignIn {
    username: string;
    password: string;
}

export interface IUserRole {
    user: IUser;
    roles: string[];
}

export const signOut = () => localStorage.removeItem("cookie")

//Mobx
export default class AuthStore {
    user: IUser = JSON.parse(localStorage.getItem("cookie")!)?.user || user
    users = new Map<string, IUser>();

    constructor() {
        makeAutoObservable(this)
    }

    get userArrays() {
        return Array.from(this.users.values());
    }

    get cookie() {
        return JSON.parse(localStorage.getItem("cookie")!);
    }

    handleUserSignIn = async (signIn: ISignIn) => {
        this.user = await this.login(signIn.username, signIn.password)

        if (this.user.id !== "") {
            if (user) {
                localStorage.setItem("cookie", JSON.stringify({ user, token: store.commonStore.randomString() }))
            } else {
                store.commonStore.setAlert({ message: "invalid username or password", type: "error" })
            }
        }

        console.log(this.user);

        return user;
    }

    login = async (username: string, password: string) => {
        try {
            store.commonStore.setLoading(true)
            const user = await apiHandler.Users.login(username, password);

            runInAction(() => {
                this.user = user;
                store.commonStore.setLoading(false)
                store.commonStore.setAlert({ type: "success", heading: "welcome back!" });

            })

            return user

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }
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


