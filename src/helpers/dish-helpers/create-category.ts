import { API_URL } from "@/config/config";
import { IMenu_Category } from "@/interfaces/menu.interface";
import Swal from "sweetalert2";

export async function createCategory(categoryData: Partial<IMenu_Category>) {
    try {
      const userSession = localStorage.getItem("userSession");
      const token = userSession ? JSON.parse(userSession).token : null;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }
    const response = await fetch(`${API_URL}/menu-category`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData)
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la respuesta del servidor:", errorData);
            throw new Error("Error en la creación de la categoría");
        }

        const data = await response.json();
        
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
          title: "Categoria creada exitosamente",
          text: `La categoria ${data.name} ha sido creada.`,
        });

        return data;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: (error as Error).message,
          });
          throw error;
    }
}