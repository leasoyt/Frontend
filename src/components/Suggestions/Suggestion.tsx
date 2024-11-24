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
  const [rating, setRating] = useState(0);
  const [vrating, setVrating] = useState(0);
  const [disableRating, setDisableRating] = useState(false);
  const [loading, setLoading] = useState(true);

  const voidStar = "w-6 h-6 fill-transparent stroke-amber-500 cursor-pointer";
  const fullStar = "w-6 h-6 fill-amber-500 stroke-amber-500 cursor-pointer";

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

  const moveStar = (_rating: number) => {
    setRating(_rating);
  };

  const sendStar = (_rating: number) => {

    if (_rating > vrating || _rating < vrating) {
      setVrating(_rating);
      setDisableRating(true);
    } else if (_rating === vrating) {
      setVrating(0);
      setDisableRating(false);
    }
  };

  // const filteredRestaurants = restaurants.filter((restaurant) => {
  //   // Si no se ha especificado ningún término de búsqueda o rating, mostramos todo
  //   const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesRating = rating !== null
  //     ? (restaurant.rating ?? 0) >= rating
  //     : true;
  //   return matchesSearch && matchesRating;
  // });

  // if (loading) return <div>Cargando...</div>;

  // const noResultsMessage = () => {
  //   if (!searchTerm && rating === null) {
  //     return "No se encontraron resultados";
  //   }

  //   const filters = [];
  //   if (searchTerm) filters.push(`la búsqueda "${searchTerm}"`);
  //   if (rating !== null) filters.push(`rating mayor o igual a ${rating}`);

  //   return `No se encontraron resultados para ${filters.join(" y ")}`;
  // };

  return (
    <div className="max-w-5xl p-4">

      {/* SEARCH */}
      <div className="flex mb-4">

        <div className="relative flex flex-col justify-end max-w-fit">
          <input
            type="text"
            placeholder="Buscar"
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
            // onKeyDown={handleKeyDown}
            className="font-serif px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent rounded-full bg-gray-100 text-black shadow-md w-96 text-center"
          />
          <div
            className="hover:bg-neutral-200 transition cursor-pointer absolute pl-2.5 pr-2.5 end-0 bottom-0 rounded-r-full rounded-l-full z-20 h-full flex items-center"
          // onClick={handleSubmit}
          >
            <Image
              className="scale-x-[-1]"
              src="https://svgsilh.com/svg/481818-666666.svg"
              alt="search-icon"
              width={25}
              height={25}
            />
          </div>
        </div>

        <div>

          {/* RATING */}
          <div
            onMouseLeave={() => {
              if (!disableRating) moveStar(0);
            }}
            className="flex">

            {
              [1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  onClick={() => sendStar(i)}
                  onMouseEnter={() => moveStar(i)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  // fill="white"
                  // stroke="black"
                  strokeWidth="1"
                  className={i <= rating || i <= vrating ? fullStar : voidStar}
                >
                  <path d="M12 17.27L18.18 21 16.54 14.81 22 10.24 15.81 9.63 12 3 8.19 9.63 2 10.24 7.46 14.81 5.82 21z" />
                </svg>
              ))
            }

            {/* <input
            type="number"
            min="0"
            max="5"
            placeholder="Filtrar por rating"
            className="font-serif text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent rounded-full bg-gray-100 text-black shadow-md w-96 text-center"
            value={rating || ""}
            onChange={(e) => setRating(e.target.value ? Number(e.target.value) : null)} // Actualiza el rating
          /> */}
          </div>
        </div>

      </div>

      <h1 className="text-2xl font-semibold text-black font-serif m-5 w-fit">Resultados</h1>

      {/* Display filtered results */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </div> */}
    </div>
  );
};

export default Suggestions;
