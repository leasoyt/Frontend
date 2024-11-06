import { API_URL } from "@/config/config";
import { IReservation } from "@/interfaces/reservation.interface";
import Swal from "sweetalert2";
import { swalNotifySuccess } from "../swal/swal-notify-success";
import { getDividedDate } from "@/utils/getDividedDate";

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

    const [date, time] = getDividedDate(new Date(data.date));
    // Muestra un mensaje de éxito usando SweetAlert
    swalNotifySuccess("Nueva reservacion Agendada!", `Para el dia ${date}`)

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
