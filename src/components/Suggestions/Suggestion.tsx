"use client";
import Link from "next/link";
import SuggestionCard from "../SuggestionCard/SuggestionCard";
import { useEffect, useState } from "react";
import { IRestaurant } from "../../interfaces/restaurant.interface";
import { API_URL } from "../../config/config";

const Suggestions: React.FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [rating, setRating] = useState<number | null>(null); // Estado para el rating
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(`${API_URL}/restaurant/query`);
        url.searchParams.append("page", "1");
        url.searchParams.append("limit", "100");

        // Agregar los filtros de búsqueda si existen
        if (searchTerm) url.searchParams.append("search", searchTerm);
        if (rating) url.searchParams.append("rating", rating.toString());

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Error al obtener los restaurantes");
        }
        const data = await response.json();
          const filteredRestaurants = data.restaurants.filter(
          (restaurant: IRestaurant) => restaurant.was_deleted === false
        );
        
        setRestaurants(filteredRestaurants || [])
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

  console.log('restaurnrs',restaurants);
  
  // Filtrar restaurantes según el término de búsqueda
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Si no se ha especificado ningún término de búsqueda o rating, mostramos todo
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = rating !== null 
    ? (restaurant.rating ?? 0) >= rating 
    : true;
    return matchesSearch && matchesRating;
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar locales"
          className="px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent rounded-full bg-gray-100 text-black shadow-md w-96 text-center"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el valor del input
        />
      </div>
       {/* Rating Filter */}
       <div className="flex justify-center mb-4">
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Filtrar por rating"
          className="px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent rounded-full bg-gray-100 text-black shadow-md w-96 text-center"
          value={rating || ""}
          onChange={(e) => setRating(e.target.value ? Number(e.target.value) : null)} // Actualiza el rating
        />
      </div>
      <h1 className="text-4xl font-semibold  text-black font-serif m-10">Te sugerimos</h1>
      {/* Display filtered results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              
              <SuggestionCard restaurant={restaurant} />
            </Link>
          ))
        ) : (
          <p className="text-black text-center col-span-full">No se encontraron resultados para `${searchTerm}`</p>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
