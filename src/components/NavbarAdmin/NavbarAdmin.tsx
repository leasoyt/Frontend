'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

const NavbarAdmin = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleLogout = () => {
        alert('sesion cerrada')
    }

  return (
        <nav className="bg-white p-4">
            <div className='flex justify-between w-[80%] m-auto mt-6'>
                <div className='flex'>
                    <Link href="/" className="flex items-center">
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
                    <ul className='flex items-center pr-9'>
                        <li>
                            <Link href="/admin/reservas/reservas" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Reservas</Link>
                        </li>
                        <li>
                            <Link href="/admin/ordenes/ordenes" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Ordenes</Link>
                        </li>
                        <li>
                            <Link href="/admin/productos/platos" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Menu</Link>
                        </li>
                        <li>
                            <Link href="#" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Mesas</Link>
                        </li>
                        <li>
                            <Link href="#" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Administracion</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='flex items-center'>
                        <li>
                            <button 
                              className="flex items-center border border-gray-300 px-4 py-2 mr-5 rounded-full text-black"
                              onClick={toggleDropdown}
                            >
                                <Image 
                                  title="admin@gmail.com"
                                  src="https://www.svgrepo.com/show/105517/user-icon.svg" 
                                  alt="Logo de usuario"
                                  width={30} 
                                  height={30} 
                                  className="mr-2"
                                />
                                <div>
                                    <p className='text-sm italic text-black'>Nombre restaurante</p>
                                    <p className='text-sm italic text-black'>admin</p>
                                </div>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                <ul className="py-2">
                                  <li>
                                    <Link href="/admin/cuenta/pagos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                      Mi cuenta
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      onClick={handleLogout}
                                      className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                      Cerrar Sesión
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                        </li>
                        <li>
                            <Link href="#">
                            <Image
                              title="Notificaciones"
                              src="https://www.svgrepo.com/show/14478/email.svg" 
                              alt="Notificaciones"
                              width={35} 
                              height={35} 
                              className="mr-2"
                            />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <hr className="w-4/5 mx-auto mt-4 border-2"></hr>
        </nav>
  )
}

export default NavbarAdmin