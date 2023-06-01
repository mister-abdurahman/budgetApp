import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import { IUser, users } from "./authStore";
import { store } from "./store";

export class UserStore {
    user: IUser | null = null;
    users = new Map<string, IUser>();

    constructor() {
        makeAutoObservable(this)
    }

    get userArrays() {
        return Array.from(this.users.values());
    }

    load_users = async () => {

        try {
            const users = await apiHandler.Users.list();

            users.forEach((user: IUser) => {
                this.users.set(user.id, user)
            })

        } catch (error) {
            console.log(error);
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

            user = await apiHandler.Users.create(user);

            runInAction(() => {
                this.users.set(user.id, user)
            })

            return this.user

        } catch (error) {
            console.log(error);
        }
    }

}