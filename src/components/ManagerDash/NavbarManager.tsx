'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { swalNotifySuccess } from '@/helpers/swal/swal-notify-success'
import { Pages } from '@/enums/pages.enum'

const NavbarManager = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && event.target instanceof Node && !divRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
    router.push("/");
    localStorage.clear();
  };

  return (
    <nav className="bg-white p-4 z-4">
      <div className='flex justify-center w-[80%] m-auto mt-6'>
        <div className='flex'>
          <Link href="/" className="flex items-center pr-24">
            <Image
              src="/Rest0logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <p className="font-extrabold text-[24px] text-black">
              Rest0
            </p>
          </Link>

          <ul className='flex items-center space-x-4'>
            <li>
              <Link href={Pages.manager.RESERVATIONS.LIST} className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Reservas</Link>
            </li>
            <li>
              <Link href={Pages.manager.PRODUCTS.BASE} className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Menu</Link>
            </li>
            <li>
              <Link href={Pages.manager.TABLES} className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Mesas</Link>
            </li>
            <li>
              <Link href={Pages.manager.EMPLOYEES.WAITERS} className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Administracion</Link>
            </li>
          </ul>
        </div>
        <div className="relative pl-24">
          <button
            //ref={}
            className="flex items-center border border-gray-300 px-4 py-2 rounded-full text-black bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>

            <div className="flex flex-col">
              <p className='text-sm font-semibold'>Mi Negocio</p>
            </div>

            <span className="ml-2">
              {
                isDropdownOpen ?
                  (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 001.414 0L10 6.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 10.293a1 1 0 00-1.414 0L10 13.586 6.707 10.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
              }
            </span>
          </button>

          {
            isDropdownOpen &&
            (
              <div ref={divRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li>
                    <Link href={Pages.manager.SUBSCRIPTION.PAYMENT} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200">
                      Subscripcion
                    </Link>
                  </li>
                  <li>
                    <Link href={Pages.manager.CONFIG} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200">
                      Configuracion
                    </Link>
                  </li>
                  <li>
                    <Link href={Pages.SEARCH} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200">
                      Volver a Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            )
          }
        </div>

      </div>

      <hr className="w-4/5 mx-auto mt-4 border-2"></hr>
    </nav>
  )
}

export default NavbarManager