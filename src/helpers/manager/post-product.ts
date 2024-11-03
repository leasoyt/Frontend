import { IDish } from "@/interfaces/dishes.interface";
import { fetchWithAuth } from "../token-expire.interceptor";
import { API_URL } from "@/config/config";

export async function PostOrUpdateProduct(dish: Partial<IDish>, method: "POST" | "PUT") {
    const built_dish = {
        name: dish.name || null,
        price: dish.price || null,
        description: dish.description || null,
        category: dish.id || null,
    }

    const clean = cleanObject(built_dish);
    const { category, ...built_to_update } = clean;

    try {

        const response = await fetchWithAuth(`${API_URL}/dish`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(method === "POST" ? built_dish : built_to_update)
        });

        return response;
    } catch (error) {
        throw error;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value != null && value !== "")
    ) as Partial<T>;
  }