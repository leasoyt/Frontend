import React, { useState, useRef } from 'react';

const NewOrderForm = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDishOpen, setIsDishOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div className="relative inline-block">
      {/* Botón que abre el menú */}
      <button ref={buttonRef} onClick={toggleMenu} className="bg-blue-500 text-white px-4 py-2 rounded">
        Opciones
      </button>

      {/* Menú desplegable */}
      {isCategoryOpen && (
        <div
          className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto z-10"
          style={{ top: '100%' }}
        >
          <ul className="py-2">
            {[1,2,3,4,5,6,7].map((i) => (
              <li key={i} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">
                Categoria {i + 1}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewOrderForm;