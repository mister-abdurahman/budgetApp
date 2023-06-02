import { createContext, useContext } from "react";
import AuthStore from "./authStore";
import CollegeStore from "./collegeStore";
import ProgramStore from "./programStore";
import DepartmentStore from "./departmentStore";
import CommonStore from "./commonStore";
import { UserStore } from "./userStore";
import StudentStore from "./studentStore";
import StudentDocumentStore from "./studentDocumentStore";

interface IStore{
    commonStore: CommonStore;
    authStore: AuthStore;
    userStore: UserStore;
    collegeStore: CollegeStore;
    departmentStore: DepartmentStore;
    programStore: ProgramStore;
    studentStore: StudentStore;
    studentDocumentStore: StudentDocumentStore;

}

export const store: IStore = {
    commonStore: new CommonStore(),
    authStore: new AuthStore(),
    userStore: new UserStore(),
    collegeStore: new CollegeStore(),
    departmentStore: new DepartmentStore(),
    programStore: new ProgramStore(),
    studentStore: new StudentStore(),
    studentDocumentStore: new StudentDocumentStore(),
} 

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}