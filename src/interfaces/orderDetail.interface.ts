import { IDish } from "./dishes.interface";

export interface IOrder_Detail{
    id:string,
    price:number,
    orderId:string,
    products:IDish[]
}