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


export default UserView;
