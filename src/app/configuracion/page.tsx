"use client";

import React, { useEffect, useState } from "react";
import NavbarUsuario from "@/components/NavbarUsuario/NavbarUsuario";
import Footer from "@/components/Footer/Footer";
import UserProfileView from "../../views/UserProfileView/UserProfileView";
import { API_URL } from "@/config/config";

interface User {
  id: string; // Agrega el ID para identificar al usuario en la actualización
  name: string;
  email: string;
  country: string;
}

const Configuracion = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
      const token = userSession?.token;

      if (!token) {
        setError("No se encontró un token de autenticación.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/user/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("No autorizado: token inválido o expirado.");
          } else {
            setError("Ocurrió un error al obtener el perfil de usuario.");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (err) {
        console.error("Error en fetchUser:", err);
        setError("Error de conexión al servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfileImage = async (newImageUrl: string) => {
    if (!user) return;
    
    // Opcional: enviar una solicitud al backend para actualizar el perfil del usuario con la nueva URL
    try {
      const response = await fetch(`${API_URL}/user/updateProfileImage`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, profile_image: newImageUrl }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la imagen de perfil");
      }

      // Actualizar el estado del usuario en el frontend
      setUser((prevUser) => prevUser ? { ...prevUser, profile_image: newImageUrl } : prevUser);
    } catch (error) {
      console.error("Error al actualizar la imagen de perfil:", error);
      setError("Hubo un problema al actualizar la imagen de perfil.");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <NavbarUsuario />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuración del Usuario</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Configuracion;
