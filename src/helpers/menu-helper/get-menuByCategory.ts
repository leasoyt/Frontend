import { API_URL } from "@/config/config";
import { IMenu } from "@/interfaces/menu.interface";
import { ErrorHelper, verifyError } from "../errors/error-helper";

export const getMenuById = async (id: string): Promise<IMenu | null> => {

    try {
        const res = await fetch(`${API_URL}/menu-category/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new ErrorHelper(verifyError(data.message), data.status);
        }
        
        return data;

    } catch (error) {
        throw error;
    }
}