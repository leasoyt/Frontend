import { API_URL } from "@/config/config";
import { IRestaurant } from "../../interfaces/restaurant.interface";
import Swal from "sweetalert2";

export async function getRestaurantById(
  restaurantId: string
): Promise<IRestaurant | null> {
  try {
    const res = await fetch(`${API_URL}/restaurant/${restaurantId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.ok) {
      const data: IRestaurant = await res.json();
      return data;
    } else {
      // Mostrar notificación de error
      Swal.fire({
        icon: "error",
        title: "No se pudo obtener el restaurante.",
      });
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred while fetching the restaurant.");
    }
  }
}
