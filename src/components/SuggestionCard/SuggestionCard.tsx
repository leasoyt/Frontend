// components/SuggestionCard.tsx
import React from 'react';
import { IRestaurant } from '@/interfaces/restaurant.interface'; // Asegúrate de la ruta

const SuggestionCard: React.FC<IRestaurant> = ({ id, name,imageUrl }) => {
  return (
    <div className="bg-neutral-200 shadow-md rounded-lg p-6 flex flex-col items-center mx-auto overflow-hidden hover:shadow-lg hover:-translate-y-1  transition-all duration-300 max-w-sm">
      <img src={"https://res.cloudinary.com/dvgvcleky/image/upload/v1729701300/RestO/c4pyhwljetkgahtkwkpi.webp"} alt={name} className="w-full h-32 object-cover rounded-md" />
      <h2 className="text-x1 font-semibold text-center mt-2 text-black italic">{name}</h2>
    </div>
  );
};

export default SuggestionCard;
