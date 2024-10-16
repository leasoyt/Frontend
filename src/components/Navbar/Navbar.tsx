import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center mt-6 max-w-5xl">
        {/* Logo */}
        <div className="flex items-center">
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

        {/* Links */}
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/contacto"
              className="italic text-black text-[24px] hover:underline active:scale-110 transition-transform duration-200"
            >
              Contacto
            </Link>
          </li>
          <li>
            <Link
              href="/resenas"
              className="italic text-black text-[24px] hover:underline active:scale-110 transition-transform duration-200"
            >
              Reseñas
            </Link>
          </li>
          <li>
            <Link
              href="/funcionalidades"
              className="italic text-black text-[24px] hover:underline active:scale-110 transition-transform duration-200"
            >
              Funcionalidades
            </Link>
          </li>
          <li>
            <Link
              href="/precios"
              className="italic text-black text-[24px] hover:underline active:scale-110 transition-transform duration-200"
            >
              Precios
            </Link>
          </li>
        </ul>
      </div>
      
      
      <hr className="w-4/5 mx-auto mt-4 border-2"></hr>
    </nav>
  );
};

export default Navbar;
