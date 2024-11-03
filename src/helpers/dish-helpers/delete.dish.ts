import { API_URL } from "@/config/config"
import Swal from "sweetalert2";
import { fetchWithAuth } from "../token-expire.interceptor";
import { ErrorHelper } from "../errors/error-helper";


export const deleteDish = async (id: string) => {

    try {
        await fetchWithAuth(`${API_URL}/dish/${id}`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        });

    } catch (error) {
        throw error;
        
    }
}