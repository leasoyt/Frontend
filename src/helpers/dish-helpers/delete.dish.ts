import { API_URL } from "@/config/config"
import Swal from "sweetalert2";


export const deleteDish = async (id: string) => {
    try {
        const res = await fetch(`${API_URL}/dish/${id}`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        })


        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: "Producto eliminado correctamente",
            });
            return true;
        } else {
            const errorData = await res.json();
            console.error("Error al eliminar producto:", errorData);
            Swal.fire({
                icon: "error",
                title: "No se pudo eliminar el producto",
                text: errorData.message || "Hubo un problema en el servidor.",
            });
            return false;
        }
    } catch (error) {
        console.error("Error de red al eliminar producto:", error);
        Swal.fire({
            icon: "error",
            title: "Ocurrió un error al eliminar el producto.",
            text: "Por favor, verifica tu conexión.",
        });
        return false;
    }
}