/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ButtonVerPrecios } from "@/components/ButtonVerPrecios/ButtonVerPrecios";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import NavbarLanding from "@/components/Navbar/Navbar";
import Footer from "@/components/General/Footer/Footer";
import { Pages } from "@/enums/pages.enum";
import ChatComponent from "@/components/General/Chat/Chatbot";

const LandingView: React.FC = () => {
  const [value, setValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const searchParams = new URLSearchParams({
      page: "1",
      limit: "8",
      search: value || "",
      rating: "0",
    });

    window.location.href = `${Pages.SEARCH}?${searchParams.toString()}`;
  };

  return (
    <>
      <NavbarLanding />
      <ChatComponent />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="min-h-screen">
          <div className="pt-4 text-3xl font-semibold text-center mt-4 text-black italic pb-16">¿Que vas a pedir hoy?</div>
          <div className="flex justify-center mb-4">
            <div className="relative flex flex-col justify-end max-w-fit">
              <input
                type="text"
                placeholder="Buscar"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="font-serif px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent rounded-full bg-gray-100 text-black shadow-md w-96 text-center"
              />
              <div
                className="hover:bg-neutral-200 transition cursor-pointer absolute pl-2.5 pr-2.5 end-0 bottom-0 rounded-r-full rounded-l-full z-20 h-full flex items-center"
                onClick={handleSubmit}
              >
                <Image
                  className="scale-x-[-1]"
                  src="https://svgsilh.com/svg/481818-666666.svg"
                  alt="search-icon"
                  width={25}
                  height={25}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-200 mt-16 p-10 w-full">
          <div className="text-3xl font-semibold text-center mt-4 text-black italic w-11/12 pb-16">Registra tu Negocio</div>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-gray-900">No se</div>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-semibold text-gray-900 font-serif">
                Software para restaurantes, bares y cafés
              </h2>
              <div className="flex justify-center p-10">
                <Image
                  src="https://i.pinimg.com/564x/5b/33/dd/5b33dde1543afe4a2eb6619e18ca2085.jpg"
                  alt="photo"
                  className="rounded-2xl"
                  width={500}
                  height={300}
                />
              </div>
            </div>
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
        </div >
      </div>

      <Footer />
    </>
  );
};

export default LandingView;