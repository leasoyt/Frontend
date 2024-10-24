import Footer from '@/components/Footer/Footer';
import NavbarUsuario from '@/components/NavbarUsuario/NavbarUsuario';
import Suggestions from '@/components/Suggestions/Suggestion';
import { CategoryButtonProps, OptionCardProps, PromoCardProps, SuggestionCardProps } from '@/interfaces/Interfaces.types';
import React from 'react';

const UserView = () => {
  return (
    <>
      <NavbarUsuario />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center pb-24 pt-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 italic">
          Hola, ¿Qué vas a pedir hoy?
        </h1>
        <div className="max-w-7xl mx-auto p-4 bg-white w-full">
          {/* Sección de categorías */}
          <section className="mb-8">
            <div className="grid grid-cols-5 gap-4">
              <CategoryButton name="Restaurantes" color=" bg-gray-600" />
              <CategoryButton name=" Market" color=" bg-gray-600" />
              <CategoryButton name="Mercados" color=" bg-gray-600" />
              <CategoryButton name="Helados" color=" bg-gray-600" />
              <CategoryButton name="Café & Deli" color=" bg-gray-600" />
            </div>
          </section>

          {/* Sección de sugerencias */}
          <section className="mb-8 items-center">
            <h2 className="text-xl font-semibold mb-4 text-black font-serif">Te sugerimos</h2>
            <Suggestions/>
          </section>

          {/* Sección de promociones */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4  text-black font-serif">No te pierdas estas promociones</h2>
            <div className="grid grid-cols-2 gap-4">
              <PromoCard title="Restaurantes" description="¡Disfrutá estas promociones!" color=" bg-gray-500" />
              <PromoCard title="Medios de pago" description="Conocé todas las opciones de ahorro!" color=" bg-gray-500" />
            </div>
          </section>

          {/* Sección de opciones destacadas */}
          <section className=''>
            <h2 className="text-xl font-semibold mb-4  text-black font-serif">Descubrí estas opciones</h2>
            <div className="flex space-x-4 overflow-x-auto">
              <OptionCard name="Mi Barrio Hamburguesería" discount="32%" shipping="1869" img="https://img.freepik.com/vector-gratis/queso-hamburguesa-ilustracion-icono-vector-dibujos-animados-fuego-alimentos-objeto-icono-concepto-aislado-premium_138676-5539.jpg" />
              {/* Agrega más opciones destacadas según sea necesario */}
            </div>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}


// Componente para categorías
function CategoryButton({ name, color }:CategoryButtonProps) {
  return (
    <button className={`p-4 rounded-lg text-white font-semibold ${color}`}>
      {name}
    </button>
  );
}

// Componente para sugerencias
function SuggestionCard({ name, discount, shipping,img}:SuggestionCardProps) {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-48">
    <img src={img} alt={`${name} logo`} className="h-20 w-20 mb-2 rounded-full" />

      <p className="font-bold">{name}</p>
      <p className="text-yellow-500">Hasta {discount} OFF</p>
      <p className="text-gray-500">Envío ${shipping}</p>
    </div>
  );
}

// Componente para promociones
function PromoCard({ title, description, color }:PromoCardProps) {
  return (
    <div className={`p-4 rounded-lg text-white font-semibold ${color}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Componente para opciones destacadas
function OptionCard({ name, discount, shipping,img }:OptionCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-64">
    <img src={img} alt={`${name} logo`} className="h-20 w-20 mb-2 rounded-full" />
    <p className="font-bold">{name}</p>
      <p className="text-yellow-500">Hasta {discount} OFF</p>
      <p className="text-gray-500">Envío ${shipping}</p>
    </div>
  );
}

export default UserView;
