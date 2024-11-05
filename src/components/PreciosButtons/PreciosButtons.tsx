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
    
    </>
  );
};

export default PreciosButtons;
