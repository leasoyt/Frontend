import { IMenu } from "./menu.interface";
import { ITable } from "./table.interface";
import { IUser } from "./user.interface"; // Si tienes una interfaz de usuario en el frontend
import { IRestaurantSchedule } from "./restaurantSchedule.interface"; // Si tienes esta interfaz
import { IReservation } from "./reservation.interface";

export interface IRestaurant {
  id: string;
  name: string;
  address: string;
  description?: string;
  imgUrl?: string | File;
  rating?: number;
  menu?: IMenu;
  tables: ITable[];
  waiters?: IUser[]; // Representa la relación con los meseros
  manager: IUser; // Representa al gerente del restaurante
  schedules: IRestaurantSchedule[]; // Horarios del restaurante
  reservations?: IReservation[]; // Reservas si tienes esta relación en el frontend
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantProps {
  params: {
    restaurantID: string;
  };
}
