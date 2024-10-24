import { ReservationStatus } from "@/enums/status.enum";

export interface IReservation{
    id:string,
    date:Date,
    status:ReservationStatus,userId:string,
    tableId:string
}