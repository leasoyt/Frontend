import Image from 'next/image'
import React from 'react'

const AdminReservasView = () => {
  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>Lista de reservas</h1>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Id Mesa
                </th>
                <th scope="col" className="px-6 py-3">
                    
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1
                </th>
                <td className="px-6 py-4">
                    24/10/2024
                </td>
                <td className="px-6 py-4">
                    Activo
                </td>
                <td className="px-6 py-4">
                    6
                </td>
                <th scope="col" className="px-6 py-3">
                  <button className='bg-slate-500 text-white font-light p-1 rounded-md'>Cancelar reserva</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default AdminReservasView