"use client";
import { API_URL } from '@/config/config';
import { createDish } from '@/helpers/dish-helpers/create-dish';
import { IRestaurant } from '@/interfaces/restaurant.interface';
import React, { useEffect, useState } from 'react'

const NewProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: ""
  });
  const [restautantId, setRestaurantId] = useState("")
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState()


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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement |HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value
    })
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createDish(productData)
  }
  
  return (
    <div className="p-3 bg-gray-100 ">
    <h1 className="text-xl font-semibold italic text-gray-800 mb-4">Detalles</h1>
    <form action="" onSubmit={handleSubmit}>
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
        <div className="mb-3">
            <label className="text-gray-700 font-medium">Nombre:</label>
            <input
                id="name"
                name="name"
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
                value={productData.name}
                onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label className="text-gray-700 font-medium">Precio:</label>
            <input
                id="price"
                name="price"
                type="number"
                className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
                value={productData.price}
                onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label className="text-gray-700 font-medium">Categoría:</label>
            <select
                id="category"
                name="category"
                className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
                value={productData.category}
                onChange={handleChange}
            >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="mb-3">
            <label className="text-gray-700 font-medium">Descripción:</label>
            <textarea
                id="description"
                name="description"
                placeholder="Descripción del producto"
                maxLength={500}
                className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
                value={productData.description}
                onChange={handleChange}
            />
        </div>
        <div className="mt-4">
            <button
                type="submit"
                className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
            >
                Agregar Producto
            </button>
        </div>
    </form>
</div>

  )
}

export default NewProductForm