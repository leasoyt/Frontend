import { IRestaurant } from "./restaurant.interface";

export default interface IQueryRestaurant {
    items: number,
    
    page: number,

    limit: number,

    total_pages: number,

    restaurants: IRestaurant[]
}