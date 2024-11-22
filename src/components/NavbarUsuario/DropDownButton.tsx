"use client";
import { Pages } from "@/enums/pages.enum";
import { UserRole } from "@/enums/role.enum";
import { IUser } from "@/interfaces/user.interface";
import { swalNotifySuccess } from "@/scripts/swal/swal-notify-success";
import { getSubPath } from "@/utils/getSubPath";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DropDownButton: React.FC<{ showLoginIfNoUser?: boolean }> = ({ showLoginIfNoUser }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false); //TODO AGREGAR LOADING SCREEN
    const divRef = useRef<HTMLDivElement>(null);
    const { user: authUser } = useUser();
    const [actual, setActual] = useState("");
    const offStyle = "block px-4 py-2 text-gray-400 hover:bg-gray-100 transition-colors duration-200 pointer-events-none";
    const onStyle = "block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200";

    useEffect(() => {
        setLoading(true);
        setActual(getSubPath(window.location.href));
        const userSession = localStorage.getItem("userSession");
        if (userSession) {
            const parsedSession = JSON.parse(userSession);
            setUser(parsedSession.user); // Almacena el usuario en el estado
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userSession");
        localStorage.removeItem("restaurant");

        // Redirige a la API de logout de Auth0
        if (authUser) {
            window.location.href = "/api/auth/logout"; // Esto redirige al endpoint de logout de Auth0
        } else {
            swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
            window.location.href = "/";
        }
    };

    const toggleDropdown = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && event.target instanceof Node && !divRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
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
                <span className="font-semibold">{showLoginIfNoUser === true && user === null ? "Iniciar" : "Mi Perfil"}</span>

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

            {isDropdownOpen ?
                showLoginIfNoUser === true && user === null ?
                    (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <ul className="py-2">
                                <li>
                                    <Link
                                        href={Pages.LOGIN}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Iniciar Sesion
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={Pages.register.USER}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Crear cuenta
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                    :
                    (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <ul className="py-2">
                                {user && user.role === UserRole.CONSUMER && (
                                    <li>
                                        <Link
                                            href={Pages.register.RESTAURANT}
                                            aria-disabled={actual === Pages.register.RESTAURANT}
                                            className={actual === Pages.register.RESTAURANT ? offStyle : onStyle}
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
                                                href={Pages.manager.PRODUCTS.BASE}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                Mi negocio
                                            </Link>
                                        </li>
                                    )}
                                {user && user.role === UserRole.ADMIN && (
                                    <li>
                                        <Link
                                            href={Pages.ADMIN}
                                            aria-disabled={actual === Pages.ADMIN}
                                            className={actual === Pages.ADMIN ? offStyle : onStyle}
                                        >
                                            Administracion
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link
                                        href={Pages.SEARCH}
                                        aria-disabled={actual === Pages.SEARCH}
                                        className={actual === Pages.SEARCH ? offStyle : onStyle}
                                    >
                                        Restaurantes
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={Pages.CUSTOMER_SERVICE}
                                        aria-disabled={actual === Pages.CUSTOMER_SERVICE}
                                        className={actual === Pages.CUSTOMER_SERVICE ? offStyle : onStyle}
                                    >
                                        Atención al Cliente
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={Pages.user.CONFIG}
                                        aria-disabled={actual === Pages.user.CONFIG}
                                        className={actual === Pages.user.CONFIG ? offStyle : onStyle}
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

                    )
                :
                null
            }
        </div>
    );
};

export default DropDownButton;