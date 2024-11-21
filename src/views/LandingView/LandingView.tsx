/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ButtonVerPrecios } from "@/components/ButtonVerPrecios/ButtonVerPrecios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/General/Footer/Footer";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useLocalStorage } from "@/scripts/auth/useLocalStorage";
import { useRouter } from "next/navigation";
import { IUser } from "@/interfaces/user.interface";
import { Pages } from "@/enums/pages.enum";
import ChatComponent from "@/components/General/Chat/Chatbot";

const LandingView: React.FC = () => {
  const router = useRouter();
  const {
    user: authUser,
    isLoading: authLoading,
    error: authError,
  } = useUser();
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // const [userData, setUserData] = useState<IUserSession | null>(null);
  const [iuser, setUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser.user;
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (!authLoading && authUser) {
      if (!iuser.toke) {
        window.location.href = "/api/auth/logout";
      }
    }

  }, [authUser, authLoading]);


  useEffect(() => {
    if(user) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);
  // const checkUserSession = useCallback(async () => {
  //   // console.log('hola');

  //   if (authUser && !session.token) {
  //     try {

  //       const { email, name, sub, picture } = authUser;

  //       const response: Response = await fetch(`${API_URL}/auth-zero/loginOrRegister`, {
  //         method: "POST",
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },

  //         body: JSON.stringify({
  //           email,
  //           name,
  //           sub,
  //           picture,
  //         })
  //       });

  //       const data = await response.json();
  //       console.log('token', data.token);




  //         // setSession({ token: data.token, user: authUser });
  //       }

  //       if(restId) {
  //         localStorage.removeItem("restaurant");
  //       }

  //       if (data.user.role === UserRole.MANAGER) {
  //         const id = await fetchManagerData();

  //         setRestId(id);
  //       }

  //     } catch (error) {
  //       console.error("Error al obtener el token:", error);
  //     }

  //   }

  //   setIsUserLoggedIn(!!authUser || !!session.user);
  // }, [authUser, session.token, session.user]);

  const handleLogout = useCallback(async () => {
    if (!authLoading && authUser) {
      window.location.href = "/api/auth/logout";
    } else if (iuser?.token) {

      try {
        setIsLoggingOut(true);
        localStorage.clear();
        router.push("/login");

      } catch (error) {

        console.error("Error al cerrar sesión:", error);
        router.push("/");
      }

    }

    setIsLoggingOut(false);
  }, [router]);


  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      // const aux = JSON.parse(localStorage.getItem("userSession")!);
      // setUserData(aux);
    }

  }, []);

  // if (authLoading) return <div>Loading...</div>;
  return (
    <>
      <Navbar />
      <ChatComponent />
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
        {disable ?
          (
            <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Link href="/login">
                <button className="bg-black text-white py-2 px-4 rounded w-full sm:w-auto">
                  Iniciar Sesión
                </button>
              </Link>
              <Link href={Pages.register.USER}>
                <div className="bg-black text-white py-2 px-4 rounded w-full sm:w-auto">
                  Registrarse
                </div>
              </Link>
            </div>
          )
          :
          (
            <div
              onClick={handleLogout}
              // disabled={isLoggingOut}
              className="bg-black text-white py-2 px-4 rounded w-full sm:w-auto m-5 cursor-pointer"
            >
              {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
            </div>
          )
        }

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 bg-neutral-200 p-10 w-full">
          <Image
            src="https://i.pinimg.com/564x/ca/ec/73/caec73a701135c04bca7b6637fd946c8.jpg"
            alt="image1"
            className="rounded-3xl h-80 sm:h-96 mx-auto"
            width={500}
            height={300}
          />
          <div className="text-center md:text-left">
            <h3 className="uppercase text-sm text-gray-600 italic font-medium">
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
            <Link href={Pages.FUNCTIONALITIES}>
              <button className="bg-black text-white py-2 px-4 rounded mt-4">
                Funcionalidades
              </button>
            </Link>
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

function fetchManagerData() {
  throw new Error("Function not implemented.");
}
