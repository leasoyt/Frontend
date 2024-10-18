import React from 'react';
import Link from 'next/link';

interface ButtonVerMasProps {
  funcionalidad: string;
}

export const ButtonVerMas: React.FC<ButtonVerMasProps> = ({ funcionalidad }) => {
  return (
    <Link href={`#${funcionalidad}`}>
      <button className="bg-black text-white py-2 px-4 rounded mt-4">
        Ver más
      </button>
    </Link>
  );
};
