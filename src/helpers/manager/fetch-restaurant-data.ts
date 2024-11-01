import { IUser } from "@/interfaces/user.interface";
import { fetchWithAuth } from "../token-expire.interceptor";
import { API_URL } from "@/config/config";
import { ErrorHelper, verifyError } from "../error-helper";

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
        // const data = await response.json();
        
        // if (!response.ok) {
        //     throw new ErrorHelper(verifyError(data.error), data.statusCode);
        // }

        return response.id;

    } catch (error) {
        throw error;
    }
}