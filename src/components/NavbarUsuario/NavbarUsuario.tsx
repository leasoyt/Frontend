'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavbarUsuario = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center mt-6 max-w-5xl">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Rest0logo.png" 
            alt="Logo"
            width={32} 
            height={32} 
            className="mr-2 " 
          />
          <p className="font-extrabold text-[24px] text-black">
            Rest0
          </p>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow flex justify-center ">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar locales"
              className="px-4 py-2.5 text-sm focus:outline-none border border-gray-300 rounded-l-full" // Redondear el input
            />
            <button className="bg-gray-600 p-3 text-white rounded-r-full"> {/* Cambiar a gris y redondear */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 18l6-6m0 0l-6-6m6 6H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center border border-gray-300 px-4 py-2 rounded-full text-black"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12a6 6 0 100-12 6 6 0 000 12zM5 14a5 5 0 0110 0v1H5v-1z"
                clipRule="evenodd"
              />
            </svg>
            Mi Perfil ▼
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li>
                  <Link href="/registerRestaurant" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Registra tu negocio
                  </Link>
                </li>
                <li>
                  <Link href="/configuracion" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Configuraciones
                  </Link>
                </li>
                <li>
                  <Link href="/historial" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Historial de Pedidos
                  </Link>
                </li>
                <li>
                  <Link href="/favoritos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Favoritos
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
        </div>
      </div>

      <hr className="w-4/5 mx-auto mt-4 border-2" />
    </nav>
  );
};

export default NavbarUsuario;
