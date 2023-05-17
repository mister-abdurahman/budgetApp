import { makeAutoObservable } from "mobx";

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
        return Array.from(programs.values());
    }

    loadPrograms = async () => {
        programs.forEach(program => {
            this.programs.set(program.id, program)
        });
    }
}


