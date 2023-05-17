import { makeAutoObservable } from "mobx";

export interface ICollege {
    id: number,
    name: string,
    description: string,
}

export interface IDepartment {
    id: number,
    name: string,
    collegeId: number,
    description: string,
}

export interface IProgram {
    id: number,
    name: string,
    departmentId: number
    description: string,
}

const colleges = [
    {
        id: 1,
        name: "science and technology",
        description: "science and technology"
    },
    {
        id: 2,
        name: "engineering",
        description: "engineering"
    },
]


export default class CollegeStore {
    college: ICollege | null = null;
    colleges = new Map<number, ICollege>();

    constructor() {
        makeAutoObservable(this)
    }

    get collegeArrays(){
        return Array.from(colleges.values());
    }

    loadColleges = async () => {
        colleges.forEach(college => {
            this.colleges.set(college.id, college)
        });
    }
}


