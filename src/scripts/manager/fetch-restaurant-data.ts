import { IUser } from "@/interfaces/user.interface";
import { API_URL } from "@/config/config";
import { fetchWithAuth } from "../token-expire.interceptor";

export async function fetchRestaurantData(): Promise<string> {
    const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
    const user: Partial<IUser> = userSession.user;

    try {
        const response = await fetchWithAuth(`${API_URL}/restaurant/manager`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({ id: user.id })
        });

        return response.id;

    } catch (error) {
        throw error;
    }
}