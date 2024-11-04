"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PagoCompletado = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const status = searchParams ? searchParams.get("status") : null;

    if (status === "approved") {
      setMessage("¡Pago exitoso! Gracias por tu compra.");
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/manager/mesas");
      }, 3000);
    } else {
      setMessage("Hubo un error con tu pago. Por favor, inténtalo de nuevo.");
      setIsSuccess(false);
      setTimeout(() => {
        router.push("/manager/pagos");
      }, 3000);
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1
          className={`text-2xl font-bold mb-4 ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "¡Pago Completado!" : "Error en el Pago"}
        </h1>
        <p className="text-gray-700 text-lg mb-6">{message}</p>
        <p className="text-gray-500">
          {isSuccess
            ? "Redirigiendo a la página de registro en 3 segundos..."
            : "Redirigiendo a la página principal en 3 segundos..."}
        </p>
      </div>
    </div>
  );
};

export default PagoCompletado;
