import { UserRole } from "@/enums/role.enum";
import { IReservation } from "./reservation.interface";
import { IRestaurant } from "./restaurant.interface";

export interface IUser {
    id: string;
    name: string;
    email: string;
    profile_image: string;
    country?: string;
    isAdmin: boolean;
    role?: UserRole;
    subscription?: string;
  
    waiterRestaurant?: IRestaurant; // Si el usuario es mesero, estará en un restaurante
    managedRestaurants?: IRestaurant[]; // Si el usuario es gerente, manejará varios restaurantes
    reservations?: IReservation[]; // Reservas hechas por el usuario
}
