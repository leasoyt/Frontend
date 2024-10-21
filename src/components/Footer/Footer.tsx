import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const Footer: React.FC = () => {
  return (

    <footer className='py-5 lg:py-8 border-t border-neutral-100 bg-white'>
      <div className='w-[96%] max-w-7xl mx-auto'>
        <div className='border-b border-neutral-100 pb-8 lg:pb-12 flex justify-between flex-col lg:flex-row items-center lg:items-start'>
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
              <Link href="#" className='hover:text-black'>Productos & Servicios</Link>
              <Link href="#" className='hover:text-black'>Recursos</Link>
              <Link href="/contacto" className='hover:text-black'>Contacto</Link>
              <Link href="#" className='hover:text-black'>Acerca de</Link>
            </ul>
            <div className='flex items-center gap-x-5'>
              <a href="https://www.facebook.com/">
                <Image className='w-[30px] transform transition-transform duration-500 hover:scale-125 mr-5' src="https://www.svgrepo.com/show/3885/facebook.svg" alt="Facebook logo" width={30} height={30} />
              </a>
              <a href="https://x.com/i/flow/login?lang=es">
                <Image className='w-[30px] transform transition-transform duration-500 hover:scale-125 mr-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/X_icon.svg" alt="X logo" width={30} height={30} />
              </a>
              <a href="https://www.youtube.com/">
                <Image className='w-[30px] transform transition-transform duration-500 hover:scale-125 mr-5' src="https://www.svgrepo.com/show/13671/youtube.svg" alt="YouTube logo" width={30} height={30} />
              </a>
              <a href="https://www.instagram.com/">
                <Image className='w-[30px] transform transition-transform duration-500 hover:scale-125 mr-5' src="https://www.svgrepo.com/show/365495/instagram-logo-thin.svg" alt="Instagram logo" width={30} height={30} />
              </a>
            </div>
          </div>
          <div className='pt-8 lg:pt-0 max-w-[624px] w-full'>
            <h4 className='mb-2 font-medium text-lg leading-7 text-gray-900 text-center lg:text-start'>
              Únete a nuestro boletín
            </h4>
            <p className='mb-6 font-medium text-gray-500 text-center lg:text-start'>
              Sé el primero en enterarte de nuestras últimas actualizaciones, ofertas exclusivas y más.
            </p>
            <form className='flex gap-x-3 w-full'>
              <input type="email" placeholder='Ingresa tu email' className='border rounded-lg p-3 text-sm focus:outline-cyan-600 flex-1' />
              <input type="submit" value="Suscríbete" className='bg-black rounded-lg py-3 px-5 text-white text-sm' />
            </form>
          </div>
        </div>
        <div className='pt-8 flex justify-between flex-col lg:flex-row gap-y-4 items-center'>
          <ul className='flex gap-x-9 text-xs text-gray-500'>
            <li><a href='#' className='hover:text-black'>English</a></li>
            <li><a href='#' className='hover:text-black'>Privacidad</a></li>
            <li><a href='#' className='hover:text-black'>Legal</a></li>
          </ul>
          <p className='text-xs text-gray-400'>2023 Cadet UI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
