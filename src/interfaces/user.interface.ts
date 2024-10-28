//import { UserRole } from "@/enums/roles.enum"; // Importa el enum correspondiente si lo tienes en el frontend
//import { SubscriptionStatus } from "@/enums/subscriptionStatus.enum"; // Importa el enum correspondiente si lo tienes en el frontend
import { IRestaurant } from "./restaurant.interface"; // Interfaz del restaurante
import { IReservation } from "./reservation.interface"; // Interfaz de la reserva

export interface IUser {
  id: string;
  name: string;
  email: string;
  profile_image: string;
  country?: string;
  isAdmin: boolean;

  subscription?: string;

  waiterRestaurant?: IRestaurant; // Si el usuario es mesero, estará en un restaurante
  managedRestaurants?: IRestaurant[]; // Si el usuario es gerente, manejará varios restaurantes
  reservations?: IReservation[]; // Reservas hechas por el usuario
}

//subscriptionStatus: SubscriptionStatus;
//role: UserRole;
