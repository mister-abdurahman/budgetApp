import { createContext, useContext } from "react";
import AuthStore from "./authStore";
import CollegeStore from "./collegeStore";
import ProgramStore from "./programStore";
import DepartmentStore from "./departmentStore";
import CommonStore from "./commonStore";
import { UserStore } from "./userStore";

interface IStore{
    commonStore: CommonStore;
    authStore: AuthStore;
    userStore: UserStore;
    collegeStore: CollegeStore;
    department: DepartmentStore;
    program: ProgramStore;

}

export const store: IStore = {
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    userStore: new UserStore(),
    collegeStore: new CollegeStore(),
    department: new DepartmentStore(),
    program: new ProgramStore(),
} 

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}