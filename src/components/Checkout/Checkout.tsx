"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

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
    <div className="border border-gray-300 p-3 mt-4 rounded-lg bg-white shadow-md w-full max-w-sm">
      <h2 className="text-lg font-semibold italic text-black mb-2">Plan Pro</h2>
      <p className="text-black italic font-semibold mt-2 mb-2">{plan.description} - Precio: ${plan.price / 100}</p>
      {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
      {success && <p className="text-green-500 mb-3 text-sm">¡Pago exitoso! Redirigiendo a registrar tu restaurante...</p>}
      <button
        onClick={handlePayment}
        className={`flex items-center justify-center text-black bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Cargando..." : (
          <div className="flex items-center justify-center w-full">
            <span className="mr-2">Pagar con</span>
            <img src="/icons/mercadopago.svg" alt="Mercado Pago" className="w-28 h-18" />
          </div>
        )}
      </button>
    </div>
  );
}

export default Checkout;
