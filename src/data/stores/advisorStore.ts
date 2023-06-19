import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface IAdvisor {
    id: number
    firstName: string;
    lastName: string;
    imageUrl: string;
    userId: string;
    advisorNumber: string;
    collegeCode: string;
    collegeName: string;
    departmentCode: string;
    departmentName: string;
    programCode: string;
    programName: string;
    levelCode: string,
    levelName: string,
    username: string;
}

export const advisor: IAdvisor = {
    id: 0,
    firstName: "",
    lastName: "",
    imageUrl: "",
    advisorNumber: "",
    userId: "",
    collegeCode: "",
    collegeName: "",
    departmentCode: "",
    departmentName: "",
    programCode: "",
    programName: "",
    levelCode: "",
    levelName: "",
    username: "",
};


export default class AdvisorStore {    
    advisor: IAdvisor = advisor;

    advisors = new Map<number, IAdvisor>();

    constructor() {
        makeAutoObservable(this)
    }

    get advisorArrays() {
        if (store.commonStore.offline) {
            return advisors;
        } else {
            return Array.from(this.advisors.values()).sort(store.commonStore.ascendingSort);
        }
    }

    load_advisors = async () => {

        try {
            store.commonStore.setLoading(true)
            const advisors = await apiHandler.Advisors.list();

            advisors.forEach((advisor: IAdvisor) => {
                runInAction(() => {
                    this.advisors.set(advisor.id, advisor)
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

    get_advisor_by_id = async (id: number) => {
        try {
            store.commonStore.setLoading(true)
            this.advisor = await apiHandler.Advisors.detail(id);

            store.commonStore.setLoading(false)
            return this.advisor

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }

    }

    get_advisor_by_user_id = async (id: string) => {
        try {
            store.commonStore.setLoading(true)
            this.advisor = await apiHandler.Advisors.get_user_by_id(id);

            store.commonStore.setLoading(false)
            return this.advisor

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }

    }

    select_advisor_by_id = (id: number) => {
        this.advisor =  this.advisors.get(id) || advisor;
    }

    create_advisor = async (advisor: IAdvisor) => {
        try {
            store.commonStore.setLoading(true)
            advisor = await apiHandler.Advisors.create(advisor);

            runInAction(() => {
                this.advisors.set(advisor.id, advisor)
                store.commonStore.setLoading(false)
                store.commonStore.setAlert({ type: "success", message: "advisor created successfully" });
            })

            return this.advisor

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.response.data });
                store.commonStore.setLoading(false)
            }
        }
    }

    create_advisor_user = async (advisor: IAdvisor) => {
        try {
            store.commonStore.setLoading(true)
            advisor = await apiHandler.Advisors.create_advisor_user(advisor);

            runInAction(() => {
                this.advisors.set(advisor.id, advisor)
                store.commonStore.setLoading(false)
                store.commonStore.setAlert({ type: "success", message: "advisor created successfully" });
            })

            return this.advisor

        } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                console.log(error);

                store.commonStore.setLoading(false)
            }
        }
    }
}


export const advisors: IAdvisor[] = []