'use client'; // Esta declaración es necesaria para componentes que dependen del cliente

import Footer from '@/components/General/Footer/Footer';
import NavbarLanding from '@/components/Navbar/Navbar';
import Image from 'next/image';
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Función para renderizar las estrellas
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating); // Estrellas completas
  const halfStar = rating % 1 !== 0; // Estrella media
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Estrellas vacías

  return (
    <div className="flex items-center mt-2">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
    </div>
  );
};

const ClientResenas = () => {
  return (
    <>
    <NavbarLanding/>

    <div className= "bg-white ">
    <>
      <Image
        src="/comiendoCelular.jpg"
        alt="resenas"
        className="rounded-3xl h-96 mx-auto"
        width={500}
        height={300}
      />
      <p className="text-2xl font-semibold text-center mt-4 text-black italic">
        Mirá lo que dicen nuestros clientes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 font-serif">
            Excelente servicio
          </h3>
          <p className="mt-2 text-gray-600 font-serif">
            El software mejoró la eficiencia de nuestro restaurante.
          </p>
          {renderStars(4.5)} {/* Reseña con 4.5 estrellas */}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 font-serif">
            Fácil de usar
          </h3>
          <p className="mt-2 text-gray-600 font-serif">
            Nos permitió gestionar órdenes rápidamente y sin errores.
          </p>
          {renderStars(5)} {/* Reseña con 5 estrellas */}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 font-serif">
            Interfaz intuitiva
          </h3>
          <p className="mt-2 text-gray-600 font-serif">
            La interfaz es muy fácil de navegar y nuestros meseros la entendieron rápidamente.
          </p>
          {renderStars(4)} {/* Reseña con 4 estrellas */}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 font-serif">
            Soporte excelente
          </h3>
          <p className="mt-2 text-gray-600 font-serif">
            Tuvimos algunas dudas y el equipo de soporte fue muy rápido y servicial.
          </p>
          {renderStars(4.5)} {/* Reseña con 4.5 estrellas */}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 font-serif">
            Altamente recomendado
          </h3>
          <p className="mt-2 text-gray-600 font-serif">
            Definitivamente recomendaría este software a otros restaurantes.
          </p>
          {renderStars(5)} {/* Reseña con 5 estrellas */}
        </div>
      </div>
    </>

    </div>
    <Footer/>
    </>
  );
};

export default ClientResenas;
