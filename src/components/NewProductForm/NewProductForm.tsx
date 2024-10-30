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

  // console.log(productData);
  console.log(restautantId);
  
  
  return (
    <div className='p-3 bg-gray-200'>
        <h1 className='italic'>Detalles</h1>
        <form action="" onSubmit={handleSubmit}>
        <div className='p-1'>
                    <label>Restaurante:</label>
                    <select
                        id='restaurant_id'
                        name='restaurant_id'
                        className="border border-gray-300 p-1 italic ml-7"
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
            <div className='p-1'>
                <label htmlFor="">Nombre:</label>
                <input
                  id='name'
                  name='name' 
                  type="text"
                  className="border border-gray-300 p-1 italic ml-7" 
                  value={productData.name}
                  onChange={handleChange}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Precio:</label>
                <input
                  id='price'
                  name='price' 
                  type="number"
                  className="border border-gray-300 p-1 italic ml-10" 
                  value={productData.price}
                  onChange={handleChange}
                />
            </div>
            <div className="p-1">
          <label>Categoría:</label>
          <select
            id="category"
            name="category"
            className="border border-gray-300 p-1 italic ml-4"
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
            <div className='p-1 flex items-center'>
                <label htmlFor="">Descripción:</label>
                <textarea
                id='description'
                name="description"
                placeholder="Descripción del producto"
                maxLength={500}
                className="w-[75%] border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={productData.description}
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-items-start p-2'>
                <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Agregar Producto</button>
            </div>
        </form>
    </div>
  )
}

export default NewProductForm