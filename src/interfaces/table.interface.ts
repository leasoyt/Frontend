import { TableStatus } from "@/enums/table.enum";
import { IReservation } from "./reservation.interface";

export interface ITable{
    id:string,
    number:number,
    status:TableStatus,
    restaurantId:string,
    reservations?:IReservation[],
    orderId?:string
}