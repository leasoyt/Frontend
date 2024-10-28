import { API_URL } from "@/config/config";
import { IMenu_Category } from "@/interfaces/menu.interface";
import Swal from "sweetalert2";

export async function createCategory(categoryData: IMenu_Category) {
    try {
      const userSession = localStorage.getItem("userSession");
      const token = userSession ? JSON.parse(userSession).token : null;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }
    const response = await fetch(`${API_URL}/menu-category`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(categoryData)
        })

        if (response.ok) {
            return await response.json();
            console.log(response);
            
        } else {
            throw new Error("Error al crear nueva categoria")
        }

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: (error as Error).message,
          });
          throw error;
    }
}