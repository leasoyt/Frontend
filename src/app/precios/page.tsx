import React from 'react';
import PreciosButtons from "../../components/PreciosButtons/PreciosButtons";
import Navbar from '@/components/Navbar/Navbar';

const Precios = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
        <h2 className="text-3xl font-semibold text-center mt-4 text-black italic">
          Precios
        </h2>
        <p className="text-gray-600 text-lg mt-4 text-center">
          Elegí el plan que más se adapte a tus necesidades.
        </p>
        <PreciosButtons />
      </div>
    </>
  );
};

export default Precios;
