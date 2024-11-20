// components/SuggestionCard.tsx
import React from 'react';
import { IRestaurant } from '@/interfaces/restaurant.interface'; // Asegúrate de la ruta


const SuggestionCard: React.FC<{ restaurant: IRestaurant }> = ({ restaurant })  => {
console.log('restaurant',restaurant);
  
   // Verifica si imgUrl es un string o un File
   let imageUrl: string = "";

   if (typeof restaurant.imgUrl === "string") {
     // Si imgUrl es un string, usalo directamente
     imageUrl = restaurant.imgUrl;
   } else if (restaurant.imgUrl instanceof File) {
     // Si imgUrl es un File, crea una URL temporal para mostrar la imagen
     imageUrl = URL.createObjectURL(restaurant.imgUrl);
   } else {
     // Si no hay imagen, usa una URL predeterminada
     imageUrl = "/default-image.jpg";
   }
  return (
    <div className="bg-neutral-200 shadow-md rounded-lg p-8 flex flex-col items-center mx-auto overflow-hidden hover:shadow-lg hover:-translate-y-1  transition-all duration-300 max-w-sm">

      <img src={imageUrl} alt={restaurant.name} className="w-full h-32 object-cover rounded-md" />
      
      
      <h2 className="text-x1 font-semibold text-center mt-2 text-black italic">{restaurant.name}</h2>
    </div>
  );
};

export default SuggestionCard;
