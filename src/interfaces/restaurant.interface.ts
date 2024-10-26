// interfaces/Restaurant.interface.ts

export interface IRestaurant {
  id: string;
  name: string;
  address?: string;
  description?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantProps {
  params: {
    restaurantID: string;
  }
}
