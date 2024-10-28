"use client";
import AddTableButton from '@/components/AdminDash/Tables/AddTableButton'
import TablesBoard from '@/components/AdminDash/Tables/TablesBoard'
import React, { useState } from 'react'

const Mesas = () => {
  const [data, setData] = useState(false);

  return (
    <div className="mr-5 mt-1 m-auto w-[95%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <div className='bg-slate-700 flex justify-center'>
        <h1 className='text-white italic font-semibold mt-2 mb-2'>Mesas</h1>
      </div>
      <div className='bg-slate-100 flex items-center justify-around p-1 w-[95%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center w-full h-auto overflow-y-visible'>
        <TablesBoard updateBoard={data} setParentState={setData} />
      </div>
      <div className='flex justify-items-start p-2'>
        <AddTableButton setParentState={setData} />
      </div>
    </div>
  )
}

export default Mesas