import NewMeseroForm from '@/components/AdminDash/Waiter/NewMeseroForm'
import React from 'react'

const AdminMeserosView = () => {
  return (
    <div className="mr-5 mt-1 w-[80%] bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-5 h-[max-content]">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>Lista de meseros</h1>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                    NOMBRE
                </th>
                <th scope="col" className="px-6 py-3">
                    MAIL
                </th>
                <th scope="col" className="px-6 py-3">
                    TELEFONO
                </th>
                <th scope="col" className="px-6 py-3">
                    CREDENCIALES
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1
                </th>
                <td className="px-6 py-4">
                    Carlos Gonzales
                </td>
                <td className="px-6 py-4">
                    carlos@gmail.com
                </td>
                <td className="px-6 py-4">
                    +57 300 256 3456
                </td>
                <td className="px-6 py-4">
                    password
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <NewMeseroForm/>
    </div>
  )
}

export default AdminMeserosView