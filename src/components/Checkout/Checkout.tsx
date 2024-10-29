"use client";

import React, { useState } from "react";
import { useRouter } from 'next/router'; // Importa el hook useRouter

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false); // Nuevo estado para el éxito
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter(); // Inicializa el router

  const handlePayment = async () => {
    setLoading(true);
    setError(null); // Resetea el error al iniciar el pago
    setSuccess(false); // Resetea el estado de éxito

    try {
      const response = await fetch(`${API_URL}/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              title: "Plan Pro",
              unit_price: 19999,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error("No se recibió init_point:", data);
        setError("Error al procesar el pago. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setError("Error al procesar el pago. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Función para redirigir después del pago exitoso
  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push('/registerRestaurant'); 
    }, 3000); 
  };

  

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Pago con Mercado Pago</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">¡Pago exitoso! Redirigiendo a registrar tu restaurante...</p>} {/* Mensaje de éxito */}
      <button
        onClick={handlePayment}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Pagar"}
      </button>
    </div>
  );
};

export default Checkout;
