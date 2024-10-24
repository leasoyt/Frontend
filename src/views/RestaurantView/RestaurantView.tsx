// pages/RestaurantPage.tsx
import NavbarUsuario from '@/components/NavbarUsuario/NavbarUsuario';
import React from 'react';

const RestaurantView: React.FC = () => {
  return (
    <>
    <NavbarUsuario/>
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-white">
        <h1 className="text-4xl font-bold">Kfc - Obelisco</h1>
        <p className="text-sm">Carlos Pellegrini 435, Buenos Aires</p>
        <div className="mt-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-1/3 p-2 rounded text-black"
          />
          <button className="bg-white p-2 rounded text-black">Buscar</button>
        </div>
      </div>

    <div className="flex mt-8 mx-4">
    <div className="w-1/4 bg-white p-4 rounded shadow-lg">
    <h3 className="font-bold mb-4 text-black">Delivery</h3>
    <p className="text-gray-500 ">30-40 min $899 envio - Minimo $3.990</p>

    </div>
    </div>
        
      <div className="flex mt-8 mx-4">
        {/* Left Sidebar - Categories */}
        <div className="w-1/4 bg-white p-4 rounded shadow-lg">
          <h2 className="font-bold mb-4 text-black">Categorías</h2>
          <ul className="space-y-2 text-black">
            <li>Almuerzos hasta $5999</li>
            <li>Almuerza con grandes marcas</li>
            <li>Cena con grandes marcas</li>
            <li>Promos para compartir</li>
            {/* Añade más categorías según sea necesario */}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-2/4 mx-4">
          <h2 className="text-xl font-bold mb-4 text-black">Productos con descuentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Producto en oferta */}
            <div className="bg-white p-4 rounded shadow-md flex justify-between">
              <div className='text-black'>
                <h3 className="font-bold text-lg">Bucket 8 strips + 2...</h3>
                <p className="text-gray-500 line-through">$21,000</p>
                <p className="text-red-500 font-bold">$14,000</p>
              </div>
              <img
                src="/bucket.jpg" // Reemplaza con la imagen correcta
                alt="Bucket"
                className="w-16 h-16 object-cover"
              />
            </div>
            {/* Repite para otros productos */}
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 text-black">Almuerzos hasta $5999</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Producto */}
            <div className="bg-white p-4 rounded shadow-md flex justify-between">
              <div className='text-black'>
                <h3 className="font-bold text-lg">Ruster + papas 30% OFF</h3>
                <p className="text-gray-500 line-through">$7,200</p>
                <p className="text-red-500 font-bold">$5,000</p>
              </div>
              <img
                src="/ruster.jpg" // Reemplaza con la imagen correcta
                alt="Ruster"
                className="w-16 h-16 object-cover"
              />
            </div>
            {/* Repite para más productos */}
          </div>
        </div>

        {/* Right Sidebar - Mi pedido */}
        <div className="w-1/4 bg-white p-4 rounded shadow-lg">
          <h2 className="font-bold mb-4 text-black">Mi pedido</h2>
          <div className="text-center text-gray-500 text-black">
            <p>Tu pedido está vacío</p>
            <img src="/empty_cart.png" alt="Empty Cart" className="w-16 h-16 mx-auto mt-4" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RestaurantView;
