import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface ILevel {
    id: number,
    name: string,
    description: string,
}

const levels = [
    {
        id: 1,
        name: "100 Level",
        description: "100 Level"
    },
    {
        id: 2,
        name: "200 Level",
        description: "200 Level"
    },
]


export default class LevelStore {
    level: ILevel | null = null;
    levels = new Map<number, ILevel>();

    constructor() {
        makeAutoObservable(this)
    }

    get levelArrays(){
        if (store.commonStore.offline) {            
            return Array.from(levels.values());
        }else{
            return Array.from(this.levels.values());
        }
    }

    load_levels = async () => {

        try {
            const levels = await apiHandler.Levels.list();

            levels.forEach((level: ILevel) => {
                runInAction(() =>{
                    this.levels.set(level.id, level)
                })
            })

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                console.log(error.message);                
            }
        }

    }

    get_level_by_id = async (id: number) => {

        if (store.commonStore.offline) {
            this.level = this.levelArrays.find(level => level.id === id) || null
        }

        try {

            this.level = await apiHandler.Levels.detail(id);
            return this.level

        } catch (error) {
            console.log(error);
        }

    }

    create_level = async (level: ILevel) => {
        try {

            level = await apiHandler.Levels.create(level);

            runInAction(() => {
                this.levels.set(level.id, level)
            })

            return this.level

        } catch (error) {
            console.log(error);
        }
    }
}


