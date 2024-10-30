import Link from 'next/link'
import React from 'react'

const AdminCuentaPlanesView = () => {
  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>PLANES</h1>
        </div>
        <div className='flex p-5 justify-normal'>
            <div>
                <h2 className='text-black italic font-semibold'>PLANES</h2>
            </div>
            <div className='border border-gray-300 p-3 ml-8'>
                <div className='mb-5'>
                    <p className='italic text-base font-semibold mb-2 text-black'>Escoge el plan que desees</p>
                    <p className='italic text-sm text-black'>Selecciona un plan de acuerdo a las funcionalidades que necesites:</p>
                </div>
                <div>
                  <p className='text-black'>poner planes aca</p>
                </div>
                <div className='flex justify-end'>
                    <Link href="#">
                       <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancelar</button>
                    </Link>
                    <Link href="#">
                       <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Activar plan</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminCuentaPlanesView