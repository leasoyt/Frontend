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
        
        <div className="max-w-7xl mx-auto p-4 bg-white w-full">

          {/* Sección de sugerencias */}
          <section className="mb-8 items-center">
            <h1 className="text-4x1 font-semibold mb-4 text-black font-serif">Te sugerimos</h1>
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
