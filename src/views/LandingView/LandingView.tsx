import Link from "next/link";
import React from "react";

const LandingView: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
  <div className="flex justify-center p-4 sm:p-6 md:p-10">
    <img
      src="https://i.pinimg.com/564x/5b/33/dd/5b33dde1543afe4a2eb6619e18ca2085.jpg"
      alt="photo"
      className="rounded-2xl max-w-full h-auto"
    />
  </div>
  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-4 text-black italic">
    Software para restaurantes, bares y cafés
  </h2>
  <div className="mt-4 space-x-2 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
    <Link href="/login">
      <button className="bg-black text-white py-2 px-6 sm:px-4 rounded w-full sm:w-auto">
        Iniciar Sesión
      </button>
    </Link>
    <Link href="/register">
      <button className="bg-black text-white py-2 px-6 sm:px-4 rounded w-full sm:w-auto mt-2 sm:mt-0">
        Registrarse
      </button>
    </Link>
  </div>

  <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-12 sm:mt-16 bg-neutral-200 p-6 sm:p-10 w-full">
    <img
      src="https://i.pinimg.com/564x/ca/ec/73/caec73a701135c04bca7b6637fd946c8.jpg"
      alt=""
      className="rounded-3xl h-64 sm:h-80 md:h-96 mx-auto"
    />
    <div className="text-center md:text-left p-4 md:p-24">
      <h3 className="text-gray-500 uppercase text-xs sm:text-sm text-gray-600 italic font-medium">
        Servicio Eficiente
      </h3>
      <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 font-serif">
        Carga pedidos y visualiza comandas en segundos
      </h4>
      <p className="mt-2 text-gray-600 font-serif text-sm sm:text-base">
        Reducí tiempos de espera al incorporar tu Monitor de Cocina (Kitchen Display System).
      </p>
      <button className="bg-black text-white py-2 px-6 rounded mt-4">
        Funcionalidades
      </button>
    </div>

    <div className="text-center p-4 md:p-24">
      <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 font-serif">
        Organización y control
      </h4>
      <p className="mt-2 text-gray-600 font-serif text-sm sm:text-base">
        Convierte cada orden en una experiencia rápida y organizada.
      </p>
      <button className="bg-black text-white py-2 px-6 rounded mt-4">
        Más Información
      </button>
    </div>
    <img
      src="https://i.pinimg.com/564x/de/4b/99/de4b99b20d0aae208c223c653ebe4474.jpg"
      alt=""
      className="rounded-3xl h-64 sm:h-80 md:h-96 mx-auto"
    />
  </section>
</div>

  
  );
};

export default LandingView;
