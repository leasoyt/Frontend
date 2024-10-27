import { ReservationStatus } from "@/enums/status.enum";

export interface IReservation {
    id: string,
    date: string,
    status: ReservationStatus, 
    user?: string | undefined,
    table?: string | undefined,
    seats: number,
    restaurant?: string | undefined,
}