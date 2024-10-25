"use client";
import Footer from "@/components/Footer/Footer";
import NavbarUsuario from "@/components/NavbarUsuario/NavbarUsuario";
import { createRestaurant } from "@/helpers/restaurant-helpers/register-restaurant";
import React, { useState } from "react";

const RegisterRestaurantView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    image: null as File | null, // Para manejar la imagen
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, files } = e.target as HTMLInputElement;
  
    if (type === "file") {
      // Si es un input de tipo archivo, obtenemos el archivo
      setFormData({ ...formData, [name]: files ? files[0] : null });
    } else {
      // Para los inputs de texto y textarea
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createRestaurant(formData); // Llama al helper con formData

      // Opcional: Reiniciar el formulario
      setFormData({
        name: "",
        address: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.error('Error al crear el restaurante:', error);
      alert('Error al crear el restaurante: ' + (error as Error).message);
    }
  };

  return (
    <>
      <NavbarUsuario />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-4 md:px-20">
        {/* Sección Izquierda */}
        <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
          <img src="/Rest0logo.png" alt="Logo" className="w-24 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">¡CREA TU CUENTA GRATIS!</h1>
          <h2 className="text-4xl font-extrabold text-gray-900">Potencia tu negocio con Rest0</h2>
          <p className="text-lg text-gray-700">Software punto de venta para <span className="font-bold">todo</span> tipo de <span className="font-bold">negocio gastronómico</span></p>
        </div>

        {/* Sección Derecha */}
        <div className="md:w-1/2 bg-white p-8 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ingresá tus datos para empezar</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-700">Nombre del negocio</label>
              <input
                id="name" // Cambia este id
                name="name" // Asegúrate de que el name coincida
                type="text"
                placeholder="Tu local"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-gray-700">Dirección</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Dirección"
                minLength={5}
                maxLength={30}
                value={formData.address}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 text-black"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Descripción (Opcional)</label>
              <textarea
                name="description"
                placeholder="Descripción del negocio"
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700">Imagen Principal (Opcional)</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-600 text-white font-medium py-2 rounded-lg hover:bg-gray-800"
            >
              CREAR CUENTA GRATIS
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default RegisterRestaurantView;
