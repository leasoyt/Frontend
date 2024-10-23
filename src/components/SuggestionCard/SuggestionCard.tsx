// components/SuggestionCard.tsx
import React from 'react';
import { IRestaurant } from '@/interfaces/restaurant.interface'; // Asegúrate de la ruta

const SuggestionCard: React.FC<IRestaurant> = ({ id, name,imageUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img src={"https://res.cloudinary.com/dvgvcleky/image/upload/v1729701300/RestO/c4pyhwljetkgahtkwkpi.webp"} alt={name} className="w-full h-32 object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
    </div>
  );
};

export default SuggestionCard;
