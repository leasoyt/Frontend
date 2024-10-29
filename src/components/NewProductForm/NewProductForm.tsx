"use client";
import { createDish } from '@/helpers/dish-helpers/create-dish';
import React, { useState } from 'react'

const NewProductForm = () => {
  const initialState = {
    name: "",
    price: "",
    description: "",
    category: ""
  };
  const [productData, setProductData] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement |HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value
    })
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await createDish(productData)
  }

  console.log(productData);
  
  return (
    <div className='p-3 bg-gray-200'>
        <h1 className='italic'>Detalles</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className='p-1'>
                <label htmlFor="">Nombre:</label>
                <input
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
                  name='price' 
                  type="number"
                  className="border border-gray-300 p-1 italic ml-10" 
                  value={productData.price}
                  onChange={handleChange}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Categoria:</label>
                <input
                  name='category' 
                  type="string"
                  className="border border-gray-300 p-1 italic ml-4" 
                  value={productData.category}
                  onChange={handleChange}
                />
            </div>
            <div className='p-1 flex items-center'>
                <label htmlFor="">Descripción:</label>
                <textarea
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