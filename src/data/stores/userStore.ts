import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import { IUser, users } from "./authStore";
import { store } from "./store";
import axios from "axios";

export const ROLES = {
    admin: "admin",
    student: "student",
    advisor: "advisor",
}

export class UserStore {
    user: IUser | null = null;
    users = new Map<string, IUser>();

    constructor() {
        makeAutoObservable(this)
    }

    get userArrays() {
        if (store.commonStore.offline) {
            return users;
        } else {
            return Array.from(this.users.values());
        }
    }

    studentArrays = () => {
        return this.userArrays.filter(x => x.roles?.find(a => a === ROLES.admin));
    }

    advisorArrays = () => {
        return this.userArrays.filter(x => x.roles?.find(a => a === ROLES.admin));
    }

    adminArrays = () => {
        return this.userArrays.filter(x => x.roles?.find(a => a === ROLES.admin));
    }

    load_users = async () => {

        try {
            store.commonStore.setLoading(true)
            const users = await apiHandler.Users.list();

            users.forEach((user: IUser) => {
                runInAction(() => {
                    this.users.set(user.id, user)
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

    get_user_by_id = async (id: string | null) => {

        if (store.commonStore.offline) {
            this.user = this.userArrays.find(user => user.id === id) || null
        }

        try {

            this.user = await apiHandler.Users.detail(id || "");
            return this.user

        } catch (error) {
            console.log(error);
        }

    }

    create_user = async (user: IUser) => {
        try {
            store.commonStore.setLoading(true)
            user = await apiHandler.Users.create(user);

            runInAction(() => {
                this.users.set(user.id, user)
                store.commonStore.setLoading(false)
                store.commonStore.setAlert({ type: "success", message: "user created successfully" });
            })

            return this.user

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }
    }

    login = async (username: string, password: string) => {
        try {
            store.commonStore.setLoading(true)
            const user = await apiHandler.Users.login(username, password);

            runInAction(() => {
                this.users.set(user.id, user)
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

    get menus() {
        return [
            {
                title: "All Users",
                total: this.userArrays.length
            },
            {
                title: "All Admins",
                total: this.userArrays.filter(x => x.roles?.find(a => a.toLowerCase === ROLES.admin.toLowerCase))?.length
            },
            {
                title: "All Advisor",
                total: this.userArrays.filter(x => x.roles?.find(a => a.toLowerCase === ROLES.advisor.toLowerCase))?.length
            },
            {
                title: "All Students",
                total: this.userArrays.filter(x => x.roles?.find(a => a.toLowerCase === ROLES.student.toLowerCase))?.length
            },
        ]
    }
}