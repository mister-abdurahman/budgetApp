import { makeAutoObservable } from "mobx";

interface IAlert {
  heading?: string;
  id?: string;
  message?: string;
  type: string;
}

//Mobx
export default class CommonStore {
  alerts = new Map<string, IAlert>();
  offline = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get alertArrays() {
    return Array.from(this.alerts.values());
  }

  get cookie() {
    return JSON.parse(localStorage.getItem("cookie")!);
  }

  setAlert = (alert: IAlert) => {
    alert.id = this.randomString();
    this.alerts.set(alert.id, alert);

    setTimeout(() => {
      this.removeAlert(alert.id!);
    }, 10000);
  };

  setLoading = (status: boolean) => {
    this.loading = status;
  };

  removeAlert = (id: string) => {
    this.alerts.delete(id);
  };

  randomString = () => Math.random().toString(36).substring(2, 20);

  ascendingSort = (a: any, b: any) => {
    const a_upper = a.firstName.toUpperCase();
    const b_upper = b.firstName.toUpperCase();
    return a_upper < b_upper ? -1 : a_upper > b_upper ? 1 : 0;
  };

  descendingSort = (a: any, b: any) => {
    const a_upper = a.lastName.toUpperCase();
    const b_upper = b.lastName.toUpperCase();
    return a_upper > b_upper ? -1 : a_upper < b_upper ? 1 : 0;
  };
}
