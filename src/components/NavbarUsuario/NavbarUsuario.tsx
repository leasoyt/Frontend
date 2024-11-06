"use client";
import { UserRole } from "@/enums/role.enum";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { IUser } from "@/interfaces/user.interface";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NavbarUsuario = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);
  const { user: authUser } = useUser();
  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("restaurant");

    // Redirige a la API de logout de Auth0
    if (authUser) {
      window.location.href = "/api/auth/logout"; // Esto redirige al endpoint de logout de Auth0
    } else {
      swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
      router.push("/"); // Si el logout es local, solo redirige
    }
  };

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      setUser(parsedSession.user); // Almacena el usuario en el estado
      if (parsedSession.user?.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        divRef.current &&
        event.target instanceof Node &&
        !divRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            className="mr-2"
          />
          <p className="font-extrabold text-[24px] text-black">Rest0</p>
        </Link>

        {/* Profile Dropdown */}
        <div ref={divRef} className="relative">
          <button
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
            <span className="font-semibold">Mi Perfil</span>

            <span className="ml-2">
              {isDropdownOpen ? (
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
              )}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                {user && user.role === UserRole.CONSUMER && (
                  <li>
                    <Link
                      href="/registerRestaurant"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Registra tu negocio
                    </Link>
                  </li>
                )}
                {user &&
                  (user.role === UserRole.MANAGER ||
                    user.role === UserRole.WAITER) && (
                    <li>
                      <Link
                        href="/manager/productos"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Mi negocio
                      </Link>
                    </li>
                  )}
                {user && user.role === UserRole.ADMIN && (
                  <li>
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Administracion
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/pageUser"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Restaurantes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/historial"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Historial de Pedidos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/atencionAlCliente"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Atención Al Cliente
                  </Link>
                </li>
                <li>
                  <Link
                    href="/configuracion"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Configuracion
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
          )}
        </div>
      </div>

      <hr className="w-4/5 mx-auto mt-4 border-2" />
    </nav>
  );
};

export default NavbarUsuario;
