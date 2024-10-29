"use client"
import React, { useState } from "react";
import { useRouter } from 'next/router';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  
  const plan = {
    name: "Plan Pro",
    price: 19999, 
    description: "Incluye acceso completo a todas las funcionalidades."
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              title: plan.name,
              unit_price: plan.price,
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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Pago con Mercado Pago</h1>
      <p className="mb-4 text-center">
        {plan.description} - Precio: ${plan.price / 100}
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">¡Pago exitoso! Redirigiendo a registrar tu restaurante...</p>}
      <button
        onClick={handlePayment}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Cargando..." : `Pagar ${plan.name}`}
      </button>
    </div>
  );
}

export default Checkout;
