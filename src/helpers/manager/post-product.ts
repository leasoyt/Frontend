import { SoftDish } from "@/interfaces/dishes.interface";
import { fetchWithAuth } from "../token-expire.interceptor";
import { API_URL } from "@/config/config";

export async function PostProduct(dish: SoftDish, category_id: string) {
    const built_dish = {
        name: dish.name,
        price: dish.price,
        description: dish.description,
        category: category_id,
    }
    let no_description = {}
    const no_dscbool = dish.description === undefined || dish.description === null;
    if (no_dscbool) {
        const { description, ...rest } = built_dish;
        no_description = rest;
    }

    try {

        const response = await fetchWithAuth(`${API_URL}/dish`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(no_dscbool ? no_description : built_dish)
        });

        return response;
    } catch (error) {
        throw error;
    }
}