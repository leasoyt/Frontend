import React from 'react';
import Link from 'next/link';

export const ButtonVerPrecios = () => {
  return (
    <Link href="/precios">
      <button className="bg-black text-white py-2 px-4 rounded mt-4">
        Ver Precios
      </button>
    </Link>
  );
};
