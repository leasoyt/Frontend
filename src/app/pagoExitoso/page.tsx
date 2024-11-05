"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import dynamic from "next/dynamic";

const PagoCompletado: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams() as { id: string };
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const status = searchParams?.get("status");

    if (status === "approved") {
      setMessage(`¡Pago exitoso para el ID ${id}! Gracias por tu compra.`);
      setIsSuccess(true);
      const timeout = setTimeout(() => {
        router.push("/manager/reservas/reservas");
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setMessage(`Hubo un error con tu pago para el ID ${id}. Por favor, inténtalo de nuevo.`);
      setIsSuccess(false);
      const timeout = setTimeout(() => {
        router.push("/manager/cuenta/planes");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams, router, id]);

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
            ? "Redirigiendo a la página de reservas en 3 segundos..."
            : "Redirigiendo a la página de planes en 3 segundos..."}
        </p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PagoCompletado), { ssr: false });
