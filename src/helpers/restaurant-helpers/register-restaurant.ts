// helpers/restaurant/create.ts
import { API_URL } from "@/config/config";
import Swal from "sweetalert2";
import { IRestaurant } from "../../interfaces/restaurant.interface";

export async function createRestaurant(restaurant: Partial<IRestaurant>) {
  
  try {
    // Recuperar el token del localStorage
    console.log(restaurant);
    const userSession = localStorage.getItem("userSession");
    const token = userSession ? JSON.parse(userSession).token : null;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(`${API_URL}/restaurant/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
      },
      body: JSON.stringify(restaurant),
    });

    if (!response.ok) {
      throw new Error("Error al crear el restaurante");
    }

    const data = await response.json();

    // Muestra un mensaje de éxito usando SweetAlert
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Restaurante creado exitosamente",
      text: `El restaurante ${data.name} ha sido creado.`,
    });
    return data; // Retornas el restaurante creado para futuras manipulaciones
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: (error as Error).message,
    });
    throw error;
  }
}
