// components/Suggestions.tsx
"use client";
import Link from 'next/link';
import SuggestionCard from '../SuggestionCard/SuggestionCard';
import { useEffect, useState } from 'react';
import { IRestaurant } from '../../interfaces/restaurant.interface';
import { API_URL } from '../../config/config'; // Asegúrate de que la ruta sea correcta

const Suggestions: React.FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]); // Inicializa como un array vací
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true); // Comienza la carga
      setError(null); // Resetea el error antes de la llamada

      try {
        const response = await fetch(`${API_URL}/restaurant/query?page=1&limit=1000`);
        if (!response.ok) {
          throw new Error('Error al obtener los restaurantes');
        }
        const data = await response.json();
        console.log(data); // Verifica que la respuesta de la API incluya `imageUrl`
        setRestaurants(data.restaurants || []);
  
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Almacena el mensaje de error
        } else {
          setError("Error desconocido"); // Maneja errores desconocidos
        }
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };


    fetchRestaurants();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {restaurants.map((restaurant) => (
        <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
          
            <SuggestionCard {...restaurant} />
          
        </Link>
      ))}
    </div>
  );
};

export default Suggestions;
