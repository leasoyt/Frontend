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
  const [update, setUpdate] = useState(false);

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
        setRestaurants(
          data.restaurants.filter((restaurant: { was_deleted: boolean; }) => !restaurant.was_deleted)
        );
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
  }, [update]);

  // Función para eliminar un restaurante
  const handleDeleteRestaurant = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/restaurant/deactivate/${id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el restaurante");
      }


      setUpdate((prevUpdate) => !prevUpdate);
    } catch (error) {
      console.error("Error al eliminar restaurante:", error);
      setError("Error al eliminar el restaurante.");
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-black">
        Lista de Restaurantes
      </h2>
      <ul className="bg-white rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(Array.isArray(restaurants) ? restaurants : []).map((restaurant) => (
          <li
            key={restaurant.id}
            className="relative p-4 rounded flex flex-col items-center bg-gray-100"
          >
            <SuggestionCard restaurant={restaurant} />
            <button
              onClick={() => handleDeleteRestaurant(restaurant.id)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
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
