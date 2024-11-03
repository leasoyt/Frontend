"use client";
import { API_URL } from '@/config/config';
import { IRestaurant } from '@/interfaces/restaurant.interface';
import React, { useEffect, useState } from 'react'

const NewOrderForm = () => {
  const [orderData, setOrderData] = useState({
    table: "",
    ordered_dishes: []
  });
  const [restaurantId, setRestaurantId] = useState("")
  const [categoryId, setCategoryId] = useState("");
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [dishes, setDishes] = useState<{ id: string; name: string; description: string; price: string }[]>([]);
  const [tables, setTables] = useState<{id: string; status: string; number: number}[]>([])
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

  const handleRestaurantChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRestaurantId = event.target.value;
    setRestaurantId(selectedRestaurantId);
    setCategoryId("");
    setDishes([]);

    if (selectedRestaurantId) {
      try {

        const tableResponse = await fetch(`${API_URL}/table/all/${selectedRestaurantId}`);
        if (!tableResponse.ok) throw new Error('No se encontraron mesas en este establecimiento');
        const tableData = await tableResponse.json();
        setTables(tableData || []);

        const categoryResponse = await fetch(`${API_URL}/restaurant/${selectedRestaurantId}`);
        if (!categoryResponse.ok) throw new Error('Error al obtener las categorías del restaurante');
        const categoryData = await categoryResponse.json();
        setCategories(categoryData.menu.categories || []);

      } catch (error) {
        setTables([])
        setCategories([]);
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    } else {
      setTables([]);
      setCategories([]);
      setError(null)
    }
  };

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = event.target.value;
    setCategoryId(selectedCategoryId);

    if (selectedCategoryId) {
      try {
        const response = await fetch(`${API_URL}/menu-category/${selectedCategoryId}`);
        if (!response.ok) throw new Error('Error al obtener los productos de la categoría');
        
        const data = await response.json();
        setDishes(data.dishes || []);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    } else {
      setDishes([]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement |HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value
    })
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  console.log(tables);
  console.log(orderData);
  
  
  return (
    <div className="p-4 bg-gray-200 max-w-md mx-auto">
  <h1 className="italic text-lg font-semibold text-black text-center mb-4">Detalles</h1>
  <form action="">
  <div className="mb-3">
            <label className="text-gray-700 font-medium">Restaurante:</label>
            <select
                id="restaurant_id"
                name="restaurant_id"
                className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
                value={restaurantId}
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
            <label className="text-gray-700 font-medium">Mesas:</label>
            <select
                id="table"
                name="table"
                className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
                value={orderData.table}
                onChange={handleChange}
            >
                <option value="">Selecciona una mesa</option>
                {tables.map((table) => (
                    <option key={table.id} value={table.number}>
                        {table.number}
                    </option>
                ))}
            </select>
        </div>
        <div className="mb-3">
          <label className="text-gray-700 font-medium">Categoría:</label>
          <select
            id="category"
            name="category"
            className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
            value={categoryId}
            onChange={handleCategoryChange}
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
          <label className="text-gray-700 font-medium">Producto:</label>
          <select
            id="ordered_dish"
            name="ordered_dish"
            className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
            // value={orderData.ordered_dish}
            onChange={handleChange}
          >
            <option value="">Selecciona un producto</option>
            {dishes.map((dish) => (
              <option key={dish.id} value={dish.id}>
                {dish.name} - ${dish.price}
              </option>
            ))}
          </select>
        </div>
    <div className="flex justify-center p-2">
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Agregar Orden
      </button>
    </div>
  </form>
</div>

  )
}

export default NewOrderForm