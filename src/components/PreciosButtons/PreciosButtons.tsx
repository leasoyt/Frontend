"use client";

import React from 'react';
import Link from 'next/link';

const PreciosButtons = () => {
  const handleComprarPlan = () => {
    // Más adelante hay que configurar la pasarela de pago.
    alert('Comprar Plan: Redirigir a pasarela de pago en el futuro');
  };

  return (
    <>
      <Link href="/funcionalidades">
        <button className="bg-black text-white py-2 px-4 rounded mt-4">
          Ver funcionalidades
        </button>
      </Link>
      <button 
        className="bg-white text-black border border-black py-2 px-4 rounded mt-4 transform transition-transform duration-300 hover:scale-105"
        onClick={handleComprarPlan}
      >
        Registrá tu Restaurante
      </button>
    </>
  );
};

export default PreciosButtons;
