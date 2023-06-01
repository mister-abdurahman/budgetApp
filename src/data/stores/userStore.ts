import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import { IUser, users } from "./authStore";
import { store } from "./store";
import axios from "axios";

export class UserStore {
    user: IUser | null = null;
    users = new Map<string, IUser>();

    constructor() {
        makeAutoObservable(this)
    }

    get userArrays() {
        if (store.commonStore.offline) {            
            return users;
        }else{
            return Array.from(this.users.values());
        }
    }

    load_users = async () => {

        try {
            const users = await apiHandler.Users.list();

            users.forEach((user: IUser) => {
                runInAction(() =>{
                    this.users.set(user.id, user)
                })
            })

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                console.log(error.message);                
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