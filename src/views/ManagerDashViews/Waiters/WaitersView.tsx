"use client";
import WaitersMapping from '@/components/ManagerDash/Waiters/WaitersMapping';
import NewMeseroForm from '@/components/ManagerDash/Waiter/NewMeseroForm'
import { API_URL } from '@/config/config';
import { HttpMessagesEnum } from '@/enums/httpMessages.enum';
import { useLocalStorage } from '@/scripts/auth/useLocalStorage';
import { AuthErrorHelper } from '@/helpers/errors/auth-error-helper';
import { ErrorHelper } from '@/helpers/errors/error-helper';
import React, { useEffect, useState } from 'react'
import { fetchWithAuth } from '@/scripts/token-expire.interceptor';

const WaitersView = () => {
  const [restId, setRestId] = useLocalStorage("restaurant", "");
  const [waiters, setWaiters] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {

    const fetchThis = async () => {
      try {

        if (restId !== "" || restId !== undefined) {

          const response = await fetchWithAuth(`${API_URL}/restaurant/waiters/${restId}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
          });

          setWaiters(response);
        } else {
          throw new ErrorHelper(HttpMessagesEnum.INSUFFICIENT_PERMISSIONS, "403");
        }

      } catch (error) {

        if (error instanceof ErrorHelper) {
          if (error.message === HttpMessagesEnum.NO_WAITERS_IN_RESTAURANT || error.message === HttpMessagesEnum.USER_NOT_FOUND) {
            setError("No hay meseros aun!");
          } else {
            AuthErrorHelper(error);
          }
        } else {
          AuthErrorHelper(error);
        }

      }

      setLoading(false);
    };

    fetchThis();
  }, [restId]);

  // if (loading) return <td colSpan={6} className="text-center py-4 text-gray-500">Cargando...</td>;
  // if (error) return <td colSpan={6} className="text-center py-4 text-gray-500">{error}</td>;

  return (
    <div className="mr-5 mt-1 w-[80%] bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-5 h-[max-content]">
      <div className='bg-slate-700 flex justify-center'>
        <h1 className='text-white italic font-semibold mt-2 mb-2'>Meseros</h1>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                NOMBRE
              </th>
              <td scope="col" className="px-6 py-3">
                MAIL
              </td>
              <td className="px-6 py-4">

              </td>
            </tr>
          </thead>
          <tbody>
            <WaitersMapping />
          </tbody>
          {
            loading ?
              <td colSpan={6} className="text-center py-4 text-gray-500">Cargando...</td>
              :
              error ?
                <td colSpan={6} className="text-center py-4 text-gray-500">{error}</td>
                : null
          }
        </table>
      </div>
    </div>
  );
}

export default WaitersView