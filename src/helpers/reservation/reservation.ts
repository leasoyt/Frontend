import { API_URL } from "@/config/config";
import { IReservation } from "@/interfaces/reservation.interface";
import Swal from "sweetalert2";

export async function createReservation(reservation: Partial<IReservation>) {
  try {
    const userSession = localStorage.getItem("userSession");
    const token = userSession ? JSON.parse(userSession).token : null;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }
    const response = await fetch(`${API_URL}/reservation/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
      },
      body: JSON.stringify(reservation),
    });
    console.log(response);

    if (!response.ok) {
      throw new Error("Error al crear la reserva");
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
      title: "Reserva creada",
      text: `la reservacion ${data.date} ha sido creada.`,
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
