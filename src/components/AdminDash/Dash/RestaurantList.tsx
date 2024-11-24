"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config/config";
import { IRestaurant } from "@/interfaces/restaurant.interface";
import SuggestionCard from "../../Suggestions/SuggestionCard";
import { fetchWithAuth } from "@/scripts/token-expire.interceptor";
import { swalNotifyError } from "@/scripts/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/scripts/swal/swal-notify-unknown-error";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";
import { swalNotifyConfirmation } from "@/scripts/swal/swal-notify-confirm";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, [update]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);

    try {
      const response = await fetchWithAuth(`${API_URL}/restaurant/query?page=1&limit=100`, {
        method: "GET"
      });

      setRestaurants(response.restaurants);

    } catch (error) {

      const washandled: boolean = AuthErrorHelper(error);

      if (!washandled) {

        if (error instanceof ErrorHelper) {
          swalNotifyError(error);
        } else {
          swalNotifyUnknownError(error);
        }
      }

    }

    setLoading(false);
  };

  const handleBanRestaurant = async (id: string) => {

    swalNotifyConfirmation("¿Estas Seguro?", "Banear Negocio").then(async (result) => {

      if (result.isConfirmed) {

        try {
          await fetchWithAuth(`${API_URL}/restaurant/ban/${id}`, {
            method: "PUT",
          });

          setUpdate((prevUpdate) => !prevUpdate);
        } catch (error) {

          const washandled: boolean = AuthErrorHelper(error);

          if (!washandled) {

            if (error instanceof ErrorHelper) {
              swalNotifyError(error);
            } else {
              swalNotifyUnknownError(error);
            }
          }
        }
      }
    });

  };

  const handleUnbanRestaurant = async (id: string) => {

    swalNotifyConfirmation("¿Estas Seguro?", "Revertir Baneo").then(async (result) => {

      if (result.isConfirmed) {

        try {
          await fetchWithAuth(`${API_URL}/restaurant/unban/${id}`, {
            method: "PUT",
          });

          setUpdate((prevUpdate) => !prevUpdate);

        } catch (error: any) {

          const washandled: boolean = AuthErrorHelper(error);

          if (!washandled) {

            if (error instanceof ErrorHelper) {
              swalNotifyError(error);
            } else {
              swalNotifyUnknownError(error);
            }

          }
        }

      }
    });

  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-black">
        Restaurantes
      </h2>
      <ul className="bg-white rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          (
            Array.isArray(restaurants) ? restaurants : []).map((restaurant) => (
              <li
                key={restaurant.id}
                className="relative p-4 rounded flex flex-col items-center bg-gray-100"
              >
                <SuggestionCard restaurant={restaurant} />

                {!restaurant.was_deleted ?
                  (<button
                    onClick={() => handleBanRestaurant(restaurant.id)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    Ban
                  </button>)
                  :
                  (<button
                    onClick={() => handleUnbanRestaurant(restaurant.id)}
                    className="mt-4 px-4 py-2 bg-lime-600 text-white rounded-full hover:bg-lime-700"
                  >
                    Unban
                  </button>)
                }
              </li>
            )
            )
        }
      </ul>
    </div>
  );
};

export default RestaurantList;
