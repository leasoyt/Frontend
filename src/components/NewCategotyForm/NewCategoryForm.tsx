"use client";
import { API_URL } from '@/config/config';
import { createCategory } from '@/helpers/dish-helpers/create-category';
import { IRestaurant } from '@/interfaces/restaurant.interface';
import React, { useEffect, useState } from 'react';

const NewCategoryForm = () => {
    const initialState = {
        restaurant_id: "",
        name: ""
    };
    const [categoryData, setCategoryData] = useState(initialState);
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
    
          try {
            const response = await fetch(`${API_URL}/restaurant/query?page=1&limit=1000`);
            if (!response.ok) {
              throw new Error('Error al obtener los restaurantes');
            }
            const data = await response.json();
            console.log(data); // Verifica que la respuesta de la API incluya `imageUrl`
            setRestaurants(data.restaurants || []);
      
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message); // Almacena el mensaje de error
            } else {
              setError("Error desconocido"); // Maneja errores desconocidos
            }
          } 
        };
        fetchRestaurants();
      }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement |HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCategoryData({
            ...categoryData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createCategory(categoryData)
            setCategoryData({
                name: "",
                restaurant_id:""
            })
            
        } catch (error) {
            
        }

    };

    console.log(categoryData);
    console.log(restaurants);
    

    return (
        <div className="p-5 bg-gray-100 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold italic text-gray-800 mb-4">Crear categoría</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Nombre:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                    value={categoryData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Restaurante:</label>
                <select
                    id="restaurant_id"
                    name="restaurant_id"
                    className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                    value={categoryData.restaurant_id}
                    onChange={handleChange}
                >
                    <option value="">Selecciona un restaurante</option>
                    {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-4">
                <button
                    type="submit"
                    className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
                >
                    Agregar categoría
                </button>
            </div>
        </form>
    </div>
    
    );
};

export default NewCategoryForm;