export interface IRestaurant {
  id: string,
  name: string,
  address: string,
  description?: string,
  imgUrl?: string | File,
  rating?: number,
  was_deleted: boolean,
  was_hidden: boolean,
}

export interface RestaurantProps {
  params: {
    restaurantID: string,
  };
}
