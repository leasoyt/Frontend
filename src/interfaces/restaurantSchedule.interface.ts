import { DayOfWeek } from "@/enums/daysOfWeek.enum";

export interface IRestaurantSchedule{
    id:string,
    isOpen:boolean,
    restaurantId:string,
    dayOfWeek:DayOfWeek
    openingTime?: string | null; // Hora de apertura, puede ser nulo
    closingTime?: string | null;
}