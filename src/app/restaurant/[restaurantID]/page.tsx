import RestaurantDetail from '@/components/RestaurantDetail/RestaurantDetail';
import { getRestaurantById } from '@/helpers/restaurant-helpers/get-restaurant';
import { RestaurantProps } from '@/interfaces/restaurant.interface'
import React from 'react'

const DetailRestaurant: React.FC<RestaurantProps> = async ({params}) => {
    const {restaurantID} = params;
    const restaurant = await getRestaurantById(restaurantID)
    console.log(restaurant);
    
  return (
    <RestaurantDetail {...restaurant}/>
  )
}

export default DetailRestaurant