"use client";
import NavbarUsuario from "@/components/NavbarUsuario/NavbarUsuario";
import React from "react";

const RegisterRestaurantView: React.FC = () => {
  return (
    <>
      <NavbarUsuario />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-4 md:px-20">
        {/* Sección Izquierda */}
        <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
          <img src="/Rest0logo.png" alt="Logo" className="w-24 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            ¡CREA TU CUENTA GRATIS!
          </h1>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Potencia tu negocio con Rest0
          </h2>
          <p className="text-lg text-gray-700">
            Software punto de venta para <span className="font-bold">todo</span>{" "}
            tipo de <span className="font-bold">negocio gastronómico</span>
          </p>

          <div className="flex space-x-8 text-center  text-gray-700">
            <div>
              <span>🍽️</span>
              <p>Restaurante</p>
            </div>
            <div>
              <span>🏍️</span>
              <p>Delivery</p>
            </div>
            <div>
              <span>🥡</span>
              <p>Take Away</p>
            </div>
          </div>

          <div className="text-gray-600 space-y-2 text-sm">
            <p>
              ✔️ Al finalizar el período de prueba vos decidís si continuar o
              no.
            </p>
            <p>
              ✔️ Los precios están disponibles en la sección de{" "}
              <span>precios</span>.
            </p>
            <p>✔️ El soporte está incluido desde el día 0.</p>
            <p>
              ✔️ No te pedimos los datos de tu tarjeta de crédito para empezar.
            </p>
          </div>
        </div>

        {/* Sección Derecha */}
        <div className="md:w-1/2 bg-white p-8 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Ingresá tus datos para empezar
          </h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-gray-700">
                Nombre del negocio
              </label>
              <input
                id="businessName"
                type="text"
                placeholder="Tu local"
                className="w-full border-gray-300 rounded-md shadow-sm p-2  text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700">Dirección</label>
              <input
                type="text"
                placeholder="Dirección"
                minLength={5}
                maxLength={30}
                className="w-full border-gray-300 rounded-md shadow-sm p-2  text-black"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">
                Descripción (Opcional)
              </label>
              <textarea
                placeholder="Descripción del negocio"
                maxLength={500}
                className="w-full border-gray-300 rounded-md shadow-sm p-2  text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700">
                Imagen Principal (Opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border-gray-300 rounded-r-md shadow-sm p-2 "
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 border-gray-300 rounded text-black"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Acepto las{" "}
                <a
                  href="#"
                  className="font-semibold text-gray-700 hover:underline"
                >
                  Condiciones del Servicio
                </a>{" "}
                y las{" "}
                <a
                  href="#"
                  className=" font-semibold text-gray-700 hover:underline"
                >
                  Políticas de Privacidad
                </a>{" "}
                de Rest0.
              </label>
            </div>
            <button
              type="submit"
              className="w-full  bg-gray-600 text-white font-medium py-2 rounded-lg hover:bg-gray-800"
            >
              CREAR CUENTA GRATIS
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterRestaurantView;
