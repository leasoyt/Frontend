// interfaces/Restaurant.interface.ts

import { IMenu } from "./menu.interface";
import { ITable } from "./table.interface";

export interface IRestaurant {
  id: string;
  name: string;
  address?: string;
  description?: string;
  phone?: string;
  email?: string;
  imgUrl?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  Menu?: IMenu[];
  Table?: ITable[];
}

export interface RestaurantProps {
  params: {
    restaurantID: string;
  };
}
