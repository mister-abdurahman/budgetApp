import { makeAutoObservable } from "mobx";

interface IAlert{
    id?: string
    message: string,
    type: string
}

//Mobx
export default class CommonStore {
    alerts = new Map<string, IAlert>();

    constructor() {
        makeAutoObservable(this)
    }

    get alertArrays() {
        return Array.from(this.alerts.values());
    }

    get cookie() {
        return JSON.parse(localStorage.getItem("cookie")!);
    }

    setAlert = (alert:IAlert) => {
        alert.id = this.randomString();
        this.alerts.set(alert.id, alert)

        setTimeout(() => {
            this.removeAlert(alert.id!)
        }, 10000);
    }

    removeAlert = (id: string) => {
        this.alerts.delete(id)
    }

    randomString = () => Math.random().toString(36).substring(2, 20)
}


