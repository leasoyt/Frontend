"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IMenu_Category } from '@/interfaces/menu.interface'

const MenuView: React.FC<IMenu_Category> = ({id, restaurant_id, name, dishes}) => {
  const [products, setProducts] = useState(dishes ?? [])

  useEffect(() => {
    if (dishes) {
      setProducts(dishes);
    }
  }, [dishes]);

  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>{name}</h1>
        </div>
        <div className='bg-slate-100 flex items-center p-1 w-[95%] m-auto'>
          <Image
            src="https://svgsilh.com/svg/1093183.svg" 
            alt="Logo"
            width={15} 
            height={15} 
            className="ml-2" 
          />
          <p className='italic ml-2 text-black'>filtrar por producto:</p>
          <input 
                type="search" 
                // value={}
                // onChange={}
                id="default-search" 
                className="border border-gray-300 p-2 italic ml-1" 
                placeholder="Producto" 
                required 
              />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                    Stock
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((dish) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {dish.id}
                </th>
                <td className="px-6 py-4">
                    {dish.name}
                </td>
                <td className="px-6 py-4">
                    {dish.stock}
                </td>
                <td className="px-6 py-4">
                    {dish.price}
                </td>
                <th scope="col" className="px-6 py-3">
                  <button className='bg-slate-500 text-white font-light p-1 rounded-md'>Eliminar producto</button>
                </th>
              </tr>
                ))
              ) : (
                <p className="text-black text-center">No hay productos para esta categoria </p>
              )}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default MenuView;