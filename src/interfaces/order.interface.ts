import { orderStatus } from "@/enums/order.enum";

export interface IOrder{
    id:string,
    date:Date,
    status:orderStatus,
    tableId?:string,
    orderDetailId:string
}



