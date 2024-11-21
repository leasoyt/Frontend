// helpers/restaurant/create.ts
import { API_URL } from "@/config/config";
import { IRestaurant } from "../../interfaces/restaurant.interface";
import { swalNotifySuccess } from "../../scripts/swal/swal-notify-success";
import { ErrorHelper, verifyError } from "@/helpers/errors/error-helper";

export async function createRestaurant(restaurant: Partial<IRestaurant>) {

  try {
    // Recuperar el token del localStorage
    console.log(restaurant);
    const userSession = localStorage.getItem("userSession");
    const token = userSession ? JSON.parse(userSession).token : null;
    const user = userSession ? JSON.parse(userSession).user : null;
    const new_restaurant = { ...restaurant, future_manager: user.id };

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }
    

    const response = await fetch(`${API_URL}/restaurant/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
      },
      body: JSON.stringify(new_restaurant),
    });
      console.log('respuesta de creacion de restaurante',response);
      
    if (!response.ok) {
      const error = await response.json();
      throw new ErrorHelper(verifyError(error.message), error.statusCode);
    }

    const data = await response.json();

    swalNotifySuccess("¡Restaurante registrado con éxito! 🎉", "Tu restaurante ahora está en línea");

    return data;
  } catch (error) {
    throw error;
  }
}
