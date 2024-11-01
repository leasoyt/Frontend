import { ReservationStatus } from "@/enums/status.enum";

export interface IReservation {
  id: string;
  date: string;
  status: ReservationStatus;
  user?: string;
  table?: string;
  seats: number;
  restaurant?: string;
}
