import React from 'react';
import PreciosButtons from "../../components/PreciosButtons/PreciosButtons";

const Precios = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
      <h2 className="text-3xl font-semibold text-center mt-4 text-black italic">
        Precios
      </h2>
      <p className="text-gray-600 text-lg mt-4 text-center font-serif">
        Conocé nuestro plan de pago para restaurantes.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center mt-6">
        <h3 className="text-2xl font-semibold text-gray-900 font-serif text-center">
          Plan Restaurante
        </h3>
        <p className="mt-4 text-gray-600 font-serif text-center">
          Para restaurantes, bares y cafés en crecimiento.
        </p>
        
        {/* Sección del Precio */}
        <div className="bg-gray-200 p-4 rounded-lg mt-4 w-full text-center">
          <p className="text-xl font-bold text-gray-800 font-serif">
            $1999/mes
          </p>
          <p className="text-gray-600 font-serif">
            Incluye todas las funcionalidades para ayudarte a gestionar tu restaurante.
          </p>
        </div>

        {/* Botones */}
        <PreciosButtons /> 
      </div>
    </div>
  );
};

export default Precios;