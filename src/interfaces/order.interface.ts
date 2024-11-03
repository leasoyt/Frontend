import { orderStatus } from "@/enums/order.enum";
import { IOrder_Detail } from "./orderDetail.interface";

export interface IOrder {
    id: string,
    date: Date,
    status: orderStatus,
    orderDetail: IOrder_Detail,
    table_id: number
}

export interface OrderedDish {
    id: string;
    quantity: number;
}

export interface IOrderCreate {
    table: string,
    ordered_dishes: OrderedDish[]
}