"use client";
import ReservationsColumns from '@/components/ManagerDash/Reservation/Reservations'
import { useLocalStorage } from '@/scripts/auth/useLocalStorage';
import React, { useEffect, useState } from 'react'

const ReservationListView = () => {
  const [isClient, setIsClient] = useState(false);
  const [restId, setRestId] = useLocalStorage("restaurant", "");

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg h-[max-content]">
      <div className='bg-slate-700 flex justify-center'>
        <h1 className='text-white italic font-semibold mt-2 mb-2'>Lista de reservas</h1>
      </div>
      <div className="relative overflow-x-auto">
        {
          isClient && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3">
                    HORA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                  Mesa
                </th> */}
                  <th scope="col" className="px-6 py-3">
                    Asientos
                  </th>
                  <th scope="col" className="px-6 py-3">

                  </th>
                </tr>
              </thead>
              <ReservationsColumns id={restId} />
            </table>
          )
        }
      </div>
    </div>
  )
}

export default ReservationListView