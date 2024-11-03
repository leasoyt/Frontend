import { IDish } from "./dishes.interface";

export interface ICategory {
    id: string,
    name: string,
    dishes: IDish[]
}