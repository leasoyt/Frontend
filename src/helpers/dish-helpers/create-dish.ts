import { API_URL } from "@/config/config";
import Swal from "sweetalert2";
import { IDish } from "@/interfaces/dishes.interface";

export async function createDish(dishData:IDish) {
    try {
      const userSession = localStorage.getItem("userSession");
      const token = userSession ? JSON.parse(userSession).token : null;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(`${API_URL}/dish`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(dishData)
        })

        if (!response.ok) {
            throw new Error("Error al crear nuevo platillo")
        }
        
        const dish = await response.json();

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
            title: "Platillo creado exitosamente",
            text: `El platillo ${dish.name} ha sido creado.`,
          });
          
          return dish
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: (error as Error).message,
          });
          throw error;
    }
}