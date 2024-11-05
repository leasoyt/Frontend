import { IDish, SoftDish } from "@/interfaces/dishes.interface";
import { fetchWithAuth } from "../token-expire.interceptor";
import { API_URL } from "@/config/config";
import { AuthErrorHelper } from "../errors/auth-error-helper";

export async function UpdateProduct(dish: Partial<IDish>) {
    const built_dish = {
        name: dish.name || null,
        price: dish.price || null,
        description: dish.description || null,
        stock: dish.stock === undefined ? "null" : dish.stock
    }

    let clean;
    if (built_dish.stock.constructor.name === "Boolean") {
        clean = { stock: built_dish.stock };
        console.log(clean);
    } else {
        clean = cleanObject(built_dish);
    }


    try {

        const response = await fetchWithAuth(`${API_URL}/dish/${dish.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(clean)
        });

        return response;
    } catch (error) {
        console.log(error);
        AuthErrorHelper(error);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== "" && value !== "null")
    ) as Partial<T>;
}