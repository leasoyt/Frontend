'use client'
import Footer from '@/components/General/Footer/Footer';
import NavbarUsuario from '@/components/NavbarUsuario/NavbarUsuario';
import Suggestions from '@/components/Suggestions/Suggestion';
import React from 'react';

const UserView = () => {

  return (
    <>
      <NavbarUsuario />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center pb-1">
        
        <div className="max-w-7xl mx-auto p-4 bg-white w-full">

          {/* Sección de sugerencias */}
          <section className="mb-8 items-center">
            <Suggestions/>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default UserView;
