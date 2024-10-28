import { orderStatus } from "@/enums/order.enum";
import { IOrder_Detail } from "./orderDetail.interface";

export interface IOrder {
    id: string,
    date: Date,
    status: orderStatus,
    orderDetail: IOrder_Detail,
    table_id: number
}