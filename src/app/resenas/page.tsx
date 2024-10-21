import Image from 'next/image';
import React from 'react';


const Resenas = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
      <h2 className="text-3xl font-semibold text-center mt-4 text-black italic">
        Reseñas
      </h2>
      <Image
          src="/comiendoCelular.jpg"
          alt="resenas"
          className="rounded-3xl h-96 mx-auto"
          width={500}
          height={300}
        />
      <p className="text-gray-600 text-lg mt-4 text-center font-serif">
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
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 font-serif">
            Fácil de usar
          </h3>
          <p className="mt-2 text-gray-600 font-serif">
            Nos permitió gestionar órdenes rápidamente y sin errores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resenas;
