import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

const Contacto = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-10">
      <h2 className="text-3xl font-semibold text-center mt-4 text-black italic">
        ¿Quiénes somos?
      </h2>
      <p className="text-gray-600 text-lg mt-4 text-center font-serif max-w-2xl">
        Somos una empresa dedicada a ofrecer soluciones tecnológicas para restaurantes, bares y cafés. Nuestro objetivo es optimizar el trabajo de los meseros y el control de las órdenes, brindando herramientas simples y eficaces.
      </p>
      <div className="bg-neutral-200 p-8 rounded-xl mt-8 shadow-lg w-full max-w-lg text-center">
        <h3 className="text-2xl font-semibold text-gray-900 font-serif">
          Datos de Contacto
        </h3>
        <p className="text-gray-600 mt-4 font-serif">
          <strong>Email:</strong> contacto@restoapp.com
        </p>
        <p className="text-gray-600 mt-2 font-serif">
          <strong>Teléfono:</strong> +54 11 1234-5678
        </p>
        <p className="text-gray-600 mt-2 font-serif">
          <strong>Dirección:</strong> Av. Siempreviva 123, Buenos Aires, Argentina
        </p>
        <p className="text-gray-600 mt-2 font-serif">
          <strong>Horario de atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM
        </p>
      </div>
    </div>
    </>
  );
};

export default Contacto;

