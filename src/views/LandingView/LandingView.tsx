"use client";

import { ButtonVerPrecios } from "@/components/ButtonVerPrecios/ButtonVerPrecios";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useLocalStorage } from "@/helpers/auth-helpers/useLocalStorage";
import { useRouter } from "next/navigation";

const LandingView: React.FC = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [token, setToken] = useLocalStorage("token", "");
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(!!user);

  console.log('usuario en la pagina', user);
  console.log('estado isuserlogge', isUserLoggedIn);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/auth/token");
        const data = await response.json();
        if (data.token) {
          setToken(data.token);
        }
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };
    console.log('user', user);


    if (user) {
      fetchToken(); // Obtiene el token solo si hay un usuario
      setIsUserLoggedIn(true);
    } else {
      // Si no hay usuario, elimina el token
      setToken(""); // Limpia el token del estado local
      localStorage.removeItem("token"); // Elimina el token del localStorage
      setIsUserLoggedIn(false); // Actualiza el estado local
    }

  }, [user, setToken]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="flex justify-center p-10">
          <Image
            src="https://i.pinimg.com/564x/5b/33/dd/5b33dde1543afe4a2eb6619e18ca2085.jpg"
            alt="photo"
            className="rounded-2xl"
            width={500}
            height={300}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mt-4 text-black italic">
          Software para restaurantes, bares y cafés
        </h2>
        {!isUserLoggedIn ? (
          <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link href="/login">
              <button className="bg-black text-white py-2 px-4 rounded w-full sm:w-auto">
                Iniciar Sesión
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-black text-white py-2 px-4 rounded w-full sm:w-auto">
                Registrarse
              </button>
            </Link>
          </div>
        ) : (

          <Link href='/api/auth/logout'>
            <button
              // onClick={handleLogout}
              className="bg-black text-white py-2 px-4 rounded w-full sm:w-auto m-5"
            >
              Cerrar Sesión
            </button></Link>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 bg-neutral-200 p-10 w-full">
          <Image
            src="https://i.pinimg.com/564x/ca/ec/73/caec73a701135c04bca7b6637fd946c8.jpg"
            alt="image1"
            className="rounded-3xl h-80 sm:h-96 mx-auto"
            width={500}
            height={300}
          />
          <div className="text-center md:text-left">
            <h3 className="text-gray-500 uppercase text-sm text-gray-600 italic font-medium">
              Servicio Eficiente
            </h3>
            <h4 className="text-3xl font-semibold text-gray-900 font-serif">
              Transformá la experiencia de tu restaurante: optimizá el control
              de comandas y acelerá los pedidos con nuestra solución inteligente
            </h4>
            <p className="mt-2 text-gray-600 font-serif">
              Reducí tiempos de espera al incorporar tu Monitor de Cocina
              (Kitchen Display System).
            </p>
            <button className="bg-black text-white py-2 px-4 rounded mt-4">
              Funcionalidades
            </button>
          </div>

          <div className="text-center p-24">
            <h4 className="text-3xl font-semibold text-gray-900 font-serif">
              Precio accesible para todo tipo de restaurante, bar o café
            </h4>
            <p className="mt-2 text-gray-600 font-serif">
              Convierte cada orden en una experiencia rápida y organizada.
            </p>
            <ButtonVerPrecios />
          </div>
          <Image
            src="https://i.pinimg.com/564x/de/4b/99/de4b99b20d0aae208c223c653ebe4474.jpg"
            alt="image2"
            className="rounded-3xl h-80 sm:h-96 mx-auto"
            width={500}
            height={300}
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingView;
