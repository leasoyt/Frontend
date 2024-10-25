import Footer from '@/components/Footer/Footer'
import NavbarUsuario from '@/components/NavbarUsuario/NavbarUsuario'
import React from 'react'

const atencionAlCliente = () => {
  return (
    <>
    <NavbarUsuario/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Atención al Cliente
      </h1>
      <p className="text-gray-600 text-center">
        Estamos aquí para ayudarte. Por favor completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
      </p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  </div>
  <Footer/>
    </>
  )
}

export default atencionAlCliente