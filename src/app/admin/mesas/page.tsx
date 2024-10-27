import TablesBoard from '@/components/AdminDash/Tables/TablesBoard'
import Image from 'next/image'
import React from 'react'

const Mesas = () => {
  return (
    <div className="mr-5 mt-1 m-auto w-[95%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <div className='bg-slate-700 flex justify-center'>
        <h1 className='text-white italic font-semibold mt-2 mb-2'>Mesas</h1>
      </div>
      <div className='bg-slate-100 flex items-center justify-around p-1 w-[95%] m-auto'>
        {/* <div className='bg-blue-500 w-[100px] h-[100px] flex items-center justify-center'>
            <h1 className='text-2xl'>1</h1>
          </div> */}
        <TablesBoard />
      </div>
      <div className='flex justify-items-start p-2'>
        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Agregar Mesa</button>
      </div>
    </div>
  )
}

export default Mesas