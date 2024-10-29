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
        <div className='p-3 bg-gray-200'>
            <h1 className='italic'>Crear categoría</h1>
            <form onSubmit={handleSubmit}>
                <div className='p-1'>
                    <label>Nombre:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="border border-gray-300 p-1 italic ml-7"
                        value={categoryData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='p-1'>
                    <label>Restaurante:</label>
                    {/* <input
                        name='restaurant_id'
                        type="text"
                        className="border border-gray-300 p-1 italic ml-7"
                        value={categoryData.restaurant_id}
                        onChange={handleChange}
                    /> */}
                    <select
                        id='restaurant_id'
                        name='restaurant_id'
                        className="border border-gray-300 p-1 italic ml-7"
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
                <div className='flex justify-items-start p-2'>
                    <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Agregar categoria
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewCategoryForm;