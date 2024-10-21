import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const NavbarAdmin = () => {
  return (
        <nav>
            <div className='flex justify-between w-[80%] m-auto'>
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
                            <Link href="#" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Restaurante</Link>
                        </li>
                        <li>
                            <Link href="#" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Ventas</Link>
                        </li>
                        <li>
                            <Link href="#" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Productos</Link>
                        </li>
                        <li>
                           <Link href="#" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Clientes</Link>
                        </li>
                        <li>
                           <Link href="#" className='ml-4 italic text-black text-xl hover:underline active:scale-110 transition-transform duration-200'>Administracion</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='flex items-center'>
                        <li>
                            <Link href="#" className='flex items-center mr-4'>
                            <Image
                              title="admin@gmail.com"
                              src="https://www.svgrepo.com/show/105517/user-icon.svg" 
                              alt="Logo de usuario"
                              width={30} 
                              height={30} 
                              className="mr-2"
                            />
                            <div>
                                <p className='text-sm italic text-black hover:underline active:scale-110 transition-transform duration-200'>Nombre restaurante</p>
                                <p className='text-sm italic text-black hover:underline active:scale-110 transition-transform duration-200'>admin</p>
                            </div>
                            </Link>
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