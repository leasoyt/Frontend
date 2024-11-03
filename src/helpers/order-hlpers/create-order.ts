import { API_URL } from "@/config/config";
import { IOrderCreate } from "@/interfaces/order.interface";
import Swal from "sweetalert2";

export async function createOrder(orderData: IOrderCreate) {
    try {
    //     const userSession = localStorage.getItem("userSession");
    //   const token = userSession ? JSON.parse(userSession).token : null;

    // if (!token) {
    //   throw new Error("No se encontró el token de autenticación.");
    // }

    const response = await fetch(`${API_URL}/order`,{
        method: "POST",
        headers: {
            "Content-type": "application/json",
            // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
    })
    console.log(response);

    if (!response.ok) {
        throw new Error("Error al crear nueva orden")
    }

    const order = await response.json();

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
        title: "Orden creada exitosamente",
        text: `La orden ha sido creada.`,
      });

      return order;
    
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: (error as Error).message,
          });
          throw error;
    }
    
}