import Image from 'next/image';
import React from 'react';
import { ButtonVerMas } from '../../components/ButtonVerMas/ButtonVerMas';
import { ButtonVerPrecios } from '../../components/ButtonVerPrecios/ButtonVerPrecios';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const Funcionalidades = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
        <h2 className="text-3xl font-semibold text-center mt-4 text-black italic">
          Funcionalidades
        </h2>
        <p className="text-gray-600 text-lg mt-4 text-center">
          Descubrí cómo nuestro software mejora la eficiencia en tu restaurante.
        </p>

        {/* Funcionalidad 1: Carga rápida de pedidos */}
        <div id="pedido" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
          <Image
            src="/celular.jpg"
            alt="Funcionalidades"
            className="rounded-3xl h-96 mx-auto"
            width={500}
            height={300}
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Carga rápida de pedidos
            </h3>
            <p className="mt-2 text-gray-600">
              Simplificá la toma de pedidos con nuestro sistema intuitivo y veloz. Podrás cargar tus pedidos muy rápidamente y en tiempo real.
            </p>
            <ButtonVerMas funcionalidad="control" />
          </div>
        </div>

        {/* Funcionalidad 2: Control y Orden */}
        <div id="control" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Control y Orden
            </h3>
            <p className="mt-2 text-gray-600">
              Gestioná el stock y las órdenes de manera eficiente, evitando errores y mejorando el control general de tu negocio.
            </p>
            <ButtonVerMas funcionalidad="mails" />
          </div>
          <Image
            src="/orden.jpg"
            alt="Funcionalidades"
            className="rounded-3xl h-96 mx-auto"
            width={500}
            height={300}
          />
        </div>

        {/* Funcionalidad 3: Notificaciones de nuevos usuarios */}
        <div id="mails" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
          <Image
            src="/celularEnvio.jpg"
            alt="Funcionalidades"
            className="rounded-3xl h-96 mx-auto"
            width={500}
            height={300}
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Notificaciones de nuevos usuarios
            </h3>
            <p className="mt-2 text-gray-600">
              Como gerente, recibirás correos electrónicos detallados cuando nuevos usuarios se registren en el sistema, manteniéndote informado en tiempo real.
            </p>
            <ButtonVerMas funcionalidad="soporte" />
          </div>
        </div>

        {/* Funcionalidad 4: Chat de soporte */}
        <div id="soporte" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Chat de soporte
            </h3>
            <p className="mt-2 text-gray-600">
              Accedé al soporte técnico directamente desde la plataforma a través de un chat disponible para resolver cualquier consulta o inconveniente.
            </p>
            <ButtonVerMas funcionalidad="platos" />
          </div>
          <Image
            src="/burbuja.jpg"
            alt="Funcionalidades"
            className="rounded-3xl h-96 mx-auto"
            width={500}
            height={300}
          />
        </div>

        {/* Funcionalidad 5: Fácil agregado de platos al menú */}
        <div id="platos" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
          <Image
            src="/menu.jpg"
            alt="Funcionalidades"
            className="rounded-3xl h-96 mx-auto"
            width={500}
            height={300}
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Fácil agregado de platos al menú
            </h3>
            <p className="mt-2 text-gray-600">
              Agregá o modificá platos en tu menú con facilidad, actualizando la carta de tu restaurante en tiempo real para tus clientes.
            </p>
            <ButtonVerMas funcionalidad="meseros" />
          </div>
        </div>

        {/* Funcionalidad 6: Control de meseros */}
        <div id="meseros" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 bg-neutral-200 p-10 w-full items-center rounded-xl shadow-lg">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Control de meseros
            </h3>
            <p className="mt-2 text-gray-600">
              Mantené el control sobre las tareas de los meseros, asignando responsabilidades y supervisando su desempeño de manera eficiente.
            </p>
          </div>
          <Image
            src="/pedido.avif"
            alt="Funcionalidades"
            className="rounded-3xl h-96 mx-auto"
            width={500}
            height={300}
          />
        </div>

        <ButtonVerPrecios />
      </div>
      <Footer/>
    </>
  );
};

export default Funcionalidades;
