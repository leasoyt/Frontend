import { IDish } from "./dishes.interface";

export interface IOrder_Detail {
    id: string,
    price: string,
    products: IDish[]
}