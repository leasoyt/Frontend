import { IRestaurant } from '@/interfaces/restaurant.interface'
import Image from 'next/image'
import React from 'react'

const RestaurantDetail: React.FC<IRestaurant> = ({id, name, address, description,imageUrl,rating}) => {
  return (
    <div>
        <p>{name}</p>
        <p>{address}</p>
        <p>{description}</p>
        <p>{rating}</p>
    </div>
  )
}

export default RestaurantDetail