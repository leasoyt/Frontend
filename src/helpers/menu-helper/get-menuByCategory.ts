import { API_URL } from "@/config/config";
import { IMenu, IMenu_Category } from "@/interfaces/menu.interface";
import Swal from "sweetalert2";

export const getMenuById = async (id:string): Promise<IMenu_Category | null> => {
    try {
        const res = await fetch(`${API_URL}/menu-category/${id}`,{
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });

        if (res.ok) {
            const data: IMenu_Category = await res.json();
            console.log(data);
            return data;
        } else {
            Swal.fire({
                icon: "error",
                title: "No se pudo obtener el restaurante.",
            });
            return null;
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ocurrió un error al obtener el menú.",
        });
        return null;
    }
}