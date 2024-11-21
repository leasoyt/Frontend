import { API_URL } from "@/config/config";
import { IMenu } from "@/interfaces/menu.interface";
import { fetchWithAuth } from "../token-expire.interceptor";

export const getCategoryById = async (id: string): Promise<IMenu> => {

    try {
        const res = await fetchWithAuth(`${API_URL}/menu-category/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        
        return res;

    } catch (error) {
        throw error;
    }
}