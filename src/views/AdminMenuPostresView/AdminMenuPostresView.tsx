import Image from 'next/image'
import React from 'react'

const AdminMenuPostresView = () => {
  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>Postres</h1>
        </div>
        <div className='bg-slate-100 flex items-center p-1 w-[95%] m-auto'>
          <Image
            src="https://svgsilh.com/svg/1093183.svg" 
            alt="Logo"
            width={15} 
            height={15} 
            className="ml-2" 
          />
          <p className='italic ml-2'>filtrar por producto:</p>
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
                    Producto
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    7
                </th>
                <td className="px-6 py-4">
                    Tiramisú
                </td>
                <td className="px-6 py-4">
                    40
                </td>
                <td className="px-6 py-4">
                    $6.00
                </td>
                <th scope="col" className="px-6 py-3">
                  <button className='bg-slate-500 text-white font-light p-1 rounded-md'>Eliminar producto</button>
                </th>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    8
                </th>
                <td className="px-6 py-4">
                    Flan de caramelo
                </td>
                <td className="px-6 py-4">
                    35
                </td>
                <td className="px-6 py-4">
                    $6.50
                </td>
                <th scope="col" className="px-6 py-3">
                  <button className='bg-slate-500 text-white font-light p-1 rounded-md'>Eliminar producto</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default AdminMenuPostresView