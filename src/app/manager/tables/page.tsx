"use client";
import AddTableButton from '@/components/ManagerDash/Tables/AddTableButton'
import TablesBoard from '@/components/ManagerDash/Tables/TablesBoard'
import { useLocalStorage } from '@/scripts/auth/useLocalStorage';
import React, { useEffect, useState } from 'react'

const Mesas = () => {
  const [data, setData] = useState(false);
  const [restId, setRestId] = useLocalStorage("restaurant", "");

  return (
    <div className="mr-5 mt-1 m-auto w-[95%] bg-white border border-gray-300 rounded-lg shadow-lg z-5">
      <div className='bg-slate-700 flex justify-center'>
        <h1 className='text-white italic font-semibold mt-2 mb-2'>Mesas</h1>
      </div>
      <div className='bg-slate-100 flex items-center justify-around p-1 w-[95%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center w-full h-auto overflow-y-visible'>
        <TablesBoard updateBoard={data} setParentState={setData} id={restId} />
      </div>
      <div className='flex justify-items-start p-2'>
        <AddTableButton setParentState={setData} id={restId} />
      </div>
    </div>
  )
}

export default Mesas