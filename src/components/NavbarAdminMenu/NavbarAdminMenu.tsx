"use client";
import { API_URL } from '@/config/config';
import { IRestaurant } from '@/interfaces/restaurant.interface';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const NavbarAdminMenu = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [restautantId, setRestaurantId] = useState("");
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

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
    
      const handleRestaurantChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRestaurantId = event.target.value;
        setRestaurantId(selectedRestaurantId);
    
        if (selectedRestaurantId) {
          try {
            const response = await fetch(`${API_URL}/restaurant/${selectedRestaurantId}`);
            if (!response.ok) throw new Error('Error al obtener las categorías del restaurante');
            
            const data = await response.json();
            setCategories(data.menu.categories || []);
          } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido");
          }
        } else {
          setCategories([]);
        }
      };

  return (
    <div className="ml-6 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className="mb-3">
            <label className="text-gray-700 font-medium">Restaurante:</label>
            <select
                id="restaurant_id"
                name="restaurant_id"
                className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
                value={restautantId}
                onChange={handleRestaurantChange}
            >
                <option value="">Selecciona un restaurante</option>
                {restaurants.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                    </option>
                ))}
            </select>
        </div>
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>Categorias</h1>
        </div>
        <ul className="py-2">
            {categories.length > 0 ?(
                categories.map((category) => (
                <li>
                    <Link href={`/manager/productos/${category.id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      {category.name}
                    </Link>
                </li>
                ))
            ) : (
                <p className="text-black text-center">No hay categorias para este restaurante</p>
            )}
            <li>
                <Link href={`/manager/productos/new`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Nuevo Producto
                 </Link>
            </li>
        </ul>
    </div>
  )
}

export default NavbarAdminMenu