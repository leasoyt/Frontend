"use client";
// pages/admin/components/RestaurantList.tsx
import { useEffect, useState } from "react";
import { API_URL } from "../../config/config";
import { IRestaurant } from "@/interfaces/restaurant.interface";
import SuggestionCard from "../SuggestionCard/SuggestionCard";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/restaurant/query?page=1&limit=100`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los restaurantes");
        }
        const data = await response.json();
        setRestaurants(data.restaurants || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Función para eliminar un restaurante
  const handleDeleteRestaurant = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/restaurant/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el restaurante");
      }
      // Actualizar el estado eliminando el restaurante borrado
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar restaurante:", error);
      setError("Error al eliminar el restaurante.");
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
    <h2 className="text-4xl font-semibold mb-4 text-center p-5">Lista de Restaurantes</h2>
    <ul className="bg-white rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
        {(Array.isArray(restaurants) ? restaurants : []).map((restaurant) => (
            <li key={restaurant.id} className="relative  p-2 rounded">
                <SuggestionCard {...restaurant} />
                <button
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 absolute top-2 right-2"
                >
                    Bannear
                </button>
            </li>
        ))}
    </ul>
</div>

  );
};

export default RestaurantList;
