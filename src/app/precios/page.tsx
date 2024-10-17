import React from 'react';

const Precios = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
      <h2 className="text-3xl font-semibold text-center mt-4 text-black italic">
        Precios
      </h2>
      <p className="text-gray-600 text-lg mt-4 text-center font-serif">
        Conocé nuestro plan de pago para restaurantes.
      </p>
      
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold text-gray-900 font-serif text-center">
            Plan Pro
          </h3>
          <p className="mt-4 text-gray-600 font-serif text-center">
            Para restaurantes en crecimiento.
          </p>
          <button className="bg-black text-white py-2 px-4 rounded mt-4">
            Ver más
          </button>
        </div>
    </div>
  );
};

export default Precios;

