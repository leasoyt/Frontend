import { IMenu_Category } from "./menu.interface";
import { IOrder_Detail } from "./orderDetail.interface";

export interface IDish{
    id:string,
    name:string,
    description:string,
    stock:boolean,
    price:number,
    imgUrl?:string,
    categoryId:IMenu_Category,
    orderdetails:IOrder_Detail[]
}