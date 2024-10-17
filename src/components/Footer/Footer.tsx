import Image from 'next/image'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='py-12 lg:py-16 border-t border-neutral-100'>
        <div className='w-[96%] max-w-7xl mx-auto'>
            <div className='border-b border-neutral-100 pb-8 lg:pb-16 flex justify-between flex-col lg:flex-row items-center lg:items-start'>
                <div className='space-y-8 pb-8 border-b border-neutral-100 lg:pb-0 lg:border-none w-full flex flex-col lg:block items-center'>
                    <div className='flex items-center'>
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
                    </div>
                    <ul className='flex gap-x-8 text-xs text-gray-500 flex-col lg:flex-row gap-y-6 text-center lg:text-start'>
                        <li><a href="#" className='hover:text-black'>Poductos & Servicios</a></li>
                        <li><a href="#" className='hover:text-black'>Recursos</a></li>
                        <li><a href="#" className='hover:text-black'>Contacto</a></li>
                        <li><a href="#" className='hover:text-black'>Acerca de</a></li>
                    </ul>
                    <div className='flex items-center gap-x-5'>
                        <a href="#">
                            <img className='w-[30px] transform transition-transform duration-500 hover:scale-125 mr-5' src="https://www.svgrepo.com/show/3885/facebook.svg" alt="" />
                        </a>
                        <a href="#">
                            <img className='w-[30px] transform transition-transform duration-500 hover:scale-125 mr-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/X_icon.svg" alt="" />
                        </a>
                        <a href="#">
                            <img className='w-[30px] transform transition-transform duration-500 hover:scale-125 mr-5' src="https://www.svgrepo.com/show/13671/youtube.svg" alt="" />
                        </a>
                        <a href="#">
                            <img className='w-[30px] transform transition-transform duration-500 hover:scale-125 mr-5' src="https://www.svgrepo.com/show/365495/instagram-logo-thin.svg" alt="" />
                        </a>
                    </div>
                    
                </div>
                <div className='pt-8 lg:pt-0 max-w-[624px] w-full'>
                    <h4 className='mb-2 font-medium text-lg leading-7 text-gray-900 text-center lg:text-start'>
                        Únete a nuestro boletín
                    </h4>
                    <p className='mb-6 font-medium text-gray-500 text-center lg:text-start'>
                        Se el primero en enterarte de nuestras últimas actualizaciones, ofertas exclusivas y más.
                    </p>
                    <form className='flex gap-x-3 w-full'>
                        <input type="email" placeholder='Ingresa tu email' className='border rounded-lg p-3 text-sm focus:outline-cyan-600 flex-1' />
                        <input type="submit" value="Suscribete" className='bg-cyan-600 rounded-lg py-3 px-5 text-white text-sm' />
                    </form>
                </div>
            </div>
            <div className='pt-8 flex justify-between flex-col lg:flex-row gap-y-4 items-center'>
                <ul className='flex gap-x-8 text-xs text-gray-500'>
                    <li><a href='#' className='hover:text-black'>English</a></li>
                    <li><a href='#' className='hover:text-black'>Privacidad</a></li>
                    <li><a href='#' className='hover:text-black'>Legal</a></li>
                </ul>
                <p className='text-xs text-gray-400'> 2023 Cadet UI. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer