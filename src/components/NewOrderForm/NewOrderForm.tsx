"use client";
import { API_URL } from '@/config/config';
import { createOrder } from '@/helpers/order-hlpers/create-order';
import { IOrderCreate } from '@/interfaces/order.interface';
import { IRestaurant } from '@/interfaces/restaurant.interface';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const NewOrderForm = () => {
  const [orderData, setOrderData] = useState<IOrderCreate>({
    table: "",
    ordered_dishes: []
  });
  const [restaurantId, setRestaurantId] = useState("")
  const [categoryId, setCategoryId] = useState("");
  const [selectedDish, setSelectedDish] = useState("");
  const [dishQuantity, setDishQuantity] = useState(1);
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

  const handleAddDish = () => {
    if (selectedDish && dishQuantity > 0) {
      setOrderData((prevData) => ({
        ...prevData,
        ordered_dishes: [
          ...prevData.ordered_dishes,
          { id: selectedDish, quantity: dishQuantity }
        ]
      }));

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Producto agregado exitosamente",
        text: `El producto ha sido agregado a la orden.`,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (orderData.ordered_dishes.length === 0) {
      setError("Debe agregar al menos un producto a la orden.");
      return;
    }
    await createOrder(orderData)
    setOrderData({
      table: "",
      ordered_dishes: []
    });
    setRestaurantId("");
    setCategoryId("");
    setTables([]);
    setDishes([]);
    setError(null);
  }

  console.log(tables);
  console.log(orderData);
  
  
  return (
    <div className="p-4 bg-gray-200 max-w-md mx-auto">
  <h1 className="italic text-lg font-semibold text-black text-center mb-4">Detalles</h1>
  <form action="" onSubmit={handleSubmit}>
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
                {tables.length > 0 ? (
                  tables.map((table) => (
                    <option key={table.id} value={table.id}>
                        {table.number}
                    </option>
                ))
                ) : (
                  <option>No hay mesas registradas para este restaurante</option>
                )}
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
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option>No existen categorias para este restaurante</option>
            )}
          </select>
        </div>
        <div className="mb-3">
          <label className="text-gray-700 font-medium">Producto:</label>
          <select
            id="ordered_dish"
            name="ordered_dish"
            className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
            value={selectedDish}
            onChange={(e) => setSelectedDish(e.target.value)}
          >
            <option value="">Selecciona un producto</option>
            {dishes.length > 0 ? (
              dishes.map((dish) => (
                <option key={dish.id} value={dish.id}>
                  {dish.name} - ${dish.price}
                </option>
              ))
            ) : (
              <option>No existen productos para esta categoria</option>
            )}
          </select>
        </div>
        <div className='flex items-center'>
        <div className="mb-3">
          <label className="text-gray-700 font-medium">Cantidad:</label>
          <input
            type="number"
            min="1"
            value={dishQuantity}
            onChange={(e) => setDishQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 text-gray-800"
          />
        </div>
        <button
          type="button"
          onClick={handleAddDish}
          className="h-10 text-sm text-white bg-gray-800 hover:bg-gray-900 rounded-lg px-0 py-0"
        >
          Agregar producto a Orden
        </button>
        </div>
    <div className="flex justify-center p-2">
      <button
        type="submit"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Crear Orden
      </button>
    </div>
  </form>
</div>

  )
}

export default NewOrderForm