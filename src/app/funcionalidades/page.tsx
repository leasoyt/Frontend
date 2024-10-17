import Image from 'next/image';
import React from 'react';

const Funcionalidades = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
      <h2 className="text-3xl font-semibold text-center mt-4 text-black italic">
        Funcionalidades
      </h2>
      <p className="text-gray-600 text-lg mt-4 text-center font-serif">
        Descubrí cómo nuestro software mejora la eficiencia en tu restaurante.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
        <Image
          src="/pedido.avif"
          alt="Funcionalidades"
          className="rounded-3xl h-96 mx-auto"
          width={500}
          height={300}
        />
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 font-serif">
            Carga rápida de pedidos
          </h3>
          <p className="mt-2 text-gray-600 font-serif">
            Simplificá la toma de pedidos con nuestro sistema intuitivo y veloz.
          </p>
          <button className="bg-black text-white py-2 px-4 rounded mt-4">
            Ver más
          </button>
        </div>
      </div>

      {/* Nueva funcionalidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 font-serif">
            Control y Orden
          </h3>
          <p className="mt-2 text-gray-600 font-serif">
            Gestioná el stock y las órdenes de manera eficiente, evitando errores y mejorando el control general de tu negocio.
          </p>
          <button className="bg-black text-white py-2 px-4 rounded mt-4">
            Ver más
          </button>
        </div>
        <Image
          src="/orden.jpg"
          alt="Funcionalidades"
          className="rounded-3xl h-96 mx-auto"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default Funcionalidades;

