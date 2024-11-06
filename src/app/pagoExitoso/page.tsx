"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const PagoCompletado: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    const status = searchParams?.get("status");
    const preapprovalId = searchParams?.get("preapproval_id"); // Obtén el ID de aprobación si lo necesitas

    if (status === "approved") {
      setMessage(`¡Pago exitoso! Gracias por tu compra. ID de aprobación: ${preapprovalId}`);
      setIsSuccess(true);
      const timeout = setTimeout(() => {
        router.push("/manager/reservas/reservas");
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setMessage(`Hubo un error con tu pago. Por favor, inténtalo de nuevo.`);
      setIsSuccess(false);
      const timeout = setTimeout(() => {
        router.push("/manager/cuenta/planes");
      }, 3000);

      return () => clearTimeout(timeout);
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
            ? "Redirigiendo a la página de reservas en 3 segundos..."
            : "Redirigiendo a la página de planes en 3 segundos..."}
        </p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PagoCompletado), { ssr: false });
