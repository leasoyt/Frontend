"use client";
import Link from "next/link";
import Image from 'next/image';
import SuggestionCard from "./SuggestionCard";
import { useEffect, useState } from "react";
import { IRestaurant } from "../../interfaces/restaurant.interface";
import { API_URL } from "../../config/config";
import { swalNotifyError } from "@/scripts/swal/swal-notify-error";
import { ErrorHelper, verifyError } from "@/helpers/errors/error-helper";

const Suggestions: React.FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [rating, setRating] = useState<number | null>(null); // Estado para el rating
  const [loading, setLoading] = useState(true);
//TODO ESTO NO DEBERIA BUSCAR DE ESTA FORMA

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);

      try {
        const url = new URL(`${API_URL}/restaurant/query`);
        url.searchParams.append("page", "1");
        url.searchParams.append("limit", "100");
        const response = await fetch(url.toString());

        const data = await response.json();

        if (!response.ok) {
          throw new ErrorHelper(verifyError(data.error), data.status);
        }

        const filteredRestaurants = data.restaurants.filter((restaurant: IRestaurant) =>
          restaurant.was_deleted === false
        );

        setRestaurants(filteredRestaurants || [])
      } catch (error) {
        if (error instanceof ErrorHelper) {
          swalNotifyError(error);
        }
      }

      setLoading(false);
    };

    fetchRestaurants();
  }, []);

  const handleSearch = () => {

  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Si no se ha especificado ningún término de búsqueda o rating, mostramos todo
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = rating !== null
      ? (restaurant.rating ?? 0) >= rating
      : true;
    return matchesSearch && matchesRating;
  });

  if (loading) return <div>Cargando...</div>;

  const noResultsMessage = () => {
    if (!searchTerm && rating === null) {
      return "No se encontraron resultados";
    }

    const filters = [];
    if (searchTerm) filters.push(`la búsqueda "${searchTerm}"`);
    if (rating !== null) filters.push(`rating mayor o igual a ${rating}`);

    return `No se encontraron resultados para ${filters.join(" y ")}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <div className="relative flex flex-col justify-end max-w-fit">
          <input
            type="text"
            placeholder="Buscar locales"
            className="px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent rounded-full bg-gray-100 text-black shadow-md w-96 text-center"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el valor del input
          />
          <Image
            onClick={handleSearch}
            className="scale-x-[-1] cursor-pointer absolute end-2.5 bottom-1 z-20"
            src="https://svgsilh.com/svg/481818-666666.svg"
            alt="search-icon"
            width={25}
            height={25}
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex justify-center mb-4">
        <input
          type="number"
          min="0"
          max="5"
          placeholder="Filtrar por rating"
          className="px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent rounded-full bg-gray-100 text-black shadow-md w-96 text-center"
          value={rating || ""}
          onChange={(e) => setRating(e.target.value ? Number(e.target.value) : null)} // Actualiza el rating
        />
      </div>
      <h1 className="text-2xl font-semibold  text-black font-serif m-10">Te sugerimos</h1>

      {/* Display filtered results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          filteredRestaurants.length > 0 ?
            (
              filteredRestaurants.map((restaurant) => (
                <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>

                  <SuggestionCard restaurant={restaurant} />
                </Link>
              ))
            ) : (

              <p className="text-black text-center col-span-full">{noResultsMessage()}</p>
            )
        }
      </div>
    </div>
  );
};

export default Suggestions;
