import { IDish } from "./dishes.interface";

export interface IMenu {
  id: string;
  name: string;
  restaurantID: string;
  categories?: IMenu_Category[];
}

export interface IMenu_Category {
  // id: string;
  restaurant_id: string;
  name: string;
  // dishes?: IDish[];
}
