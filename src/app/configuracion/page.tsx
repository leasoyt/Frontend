"use client";

import React, { useEffect, useState } from "react";
import NavbarUsuario from "@/components/NavbarUsuario/NavbarUsuario";
import Footer from "@/components/Footer/Footer";
import UserProfileView from "../../views/UserProfileView/UserProfileView";

interface User {
  name: string;
  email: string;
  country: string;
  profile_image: string;
}

const Configuracion = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch("http://localhost:4000/user/profile", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener la información del usuario");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-lg">Cargando...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-lg text-red-500">Error: {error}</div>;

  return (
    <>
      <NavbarUsuario />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuración del Usuario</h1>
          <UserProfileView user={user} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Configuracion;
