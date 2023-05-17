import { createContext, useContext } from "react";
import AuthStore from "./authStore";
import CollegeStore from "./collegeStore";
import ProgramStore from "./programStore";
import DepartmentStore from "./departmentStore";

interface IStore{
    authStore: AuthStore;
    collegeStore: CollegeStore;
    department: DepartmentStore;
    program: ProgramStore;

}

export const store: IStore = {
    authStore: new AuthStore(),
    collegeStore: new CollegeStore(),
    department: new DepartmentStore(),
    program: new ProgramStore(),
} 

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}