import { API_URL } from "@/config/config";
import { ICategory_menu, IMenu, IMenu_Category } from "@/interfaces/menu.interface";
import Swal from "sweetalert2";

export const getMenuById = async (id:string): Promise<ICategory_menu | null> => {
    try {
        const res = await fetch(`${API_URL}/menu-category/${id}`,{
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });

        if (res.ok) {
            const data: ICategory_menu = await res.json();
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