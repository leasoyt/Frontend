import Link from "next/link";
import React from "react";
import Image from "next/image";

const LandingView: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-center p-10">
        <Image
          src="https://i.pinimg.com/564x/5b/33/dd/5b33dde1543afe4a2eb6619e18ca2085.jpg"
          alt="photo"
          className="rounded-2xl"
          width={500} // Ajusta los valores de ancho y alto según tus necesidades
          height={300}
        />
      </div>
      <h2 className="text-2xl font-semibold text-center mt-4 text-black italic">
        Software para restaurantes, bares y cafés
      </h2>
      <div className="mt-4 space-x-4 flex justify-center">
        <Link href="/login">
          <button className="bg-black text-white py-2 px-4 rounded">
            Iniciar Sesión
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-black text-white py-2 px-4 rounded">
            Registrarse
          </button>
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 bg-neutral-200 p-10 w-full h-screen items-center">
        <Image
          src="https://i.pinimg.com/564x/ca/ec/73/caec73a701135c04bca7b6637fd946c8.jpg"
          alt="image1"
          className="rounded-3xl h-96 mx-auto"
          width={500} 
          height={300} 
        />
        <div className="text-center md:text-left">
          <h3 className="text-gray-500 uppercase text-sm text-gray-600 italic font-medium">
            Servicio Eficiente
          </h3>
          <h4 className="text-3xl font-semibold text-gray-900 font-serif">
            Carga pedidos y visualiza comandas en segundos
          </h4>
          <p className="mt-2 text-gray-600 font-serif">
            Reducí tiempos de espera al incorporar tu Monitor de Cocina (Kitchen
            Display System).
          </p>
          <button className="bg-black text-white py-2 px-4 rounded mt-4">
            Funcionalidades
          </button>
        </div>

        <div className="text-center">
          <h4 className="text-3xl font-semibold text-gray-900 font-serif">
            Organización y control
          </h4>
          <p className="mt-2 text-gray-600 font-serif">
            Convierte cada orden en una experiencia rápida y organizada.
          </p>
          <button className="bg-black text-white py-2 px-4 rounded mt-4">
            Más Información
          </button>
        </div>
        <Image
          src="https://i.pinimg.com/564x/de/4b/99/de4b99b20d0aae208c223c653ebe4474.jpg"
          alt="image2"
          className="rounded-3xl h-96 mx-auto"
          width={500} 
          height={300} 
        />
      </section>
    </div>
  );
};

export default LandingView;
