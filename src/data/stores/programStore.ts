import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import apiHandler from "../api/apiHandler";
import axios from "axios";

export interface IProgram {
    id: number,
    name: string,
    collegeId: number,
    programId: number
    description: string,
}

const programs: IProgram[] = []

export default class ProgramStore {
    program: IProgram | null = null;
    programs = new Map<number, IProgram>();

    constructor() {
        makeAutoObservable(this)
    }

    get programArrays(){
        if (store.commonStore.offline) {            
            return Array.from(programs.values());
        }else{
            return Array.from(this.programs.values());
        }
    }

    load_programs = async () => {

        try {
            const programs = await apiHandler.Programs.list();

            programs.forEach((program: IProgram) => {
                runInAction(() =>{
                    this.programs.set(program.id, program)
                })
            })

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                console.log(error.message);                
            }
        }

    }

    get_program_by_id = async (id: number) => {

        if (store.commonStore.offline) {
            this.program = this.programArrays.find(program => program.id === id) || null
        }

        try {

            this.program = await apiHandler.Programs.detail(id);
            return this.program

        } catch (error) {
            console.log(error);
        }

    }

    create_program = async (program: IProgram) => {
        try {

            program = await apiHandler.Programs.create(program);

            runInAction(() => {
                this.programs.set(program.id, program)
            })

            return this.program

        } catch (error) {
            console.log(error);
        }
    }
}


