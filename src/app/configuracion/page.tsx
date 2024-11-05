"use client";

import React, { useEffect, useState } from "react";
import NavbarUsuario from "@/components/NavbarUsuario/NavbarUsuario";
import Footer from "@/components/Footer/Footer";
import { API_URL } from "@/config/config";
import { fetchWithAuth } from '@/helpers/token-expire.interceptor'; 

interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  profile_image: string;
}

const Configuracion = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetchWithAuth(`${API_URL}/user/profile`, {
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
        setNewName(userData.name);
        setNewImage(userData.profile_image); // Inicializa el nuevo enlace de la imagen
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const updatedUser = {
      name: newName,
      profile_image: newImage, // Envía el nuevo enlace de la imagen
    };

    try {
      const response = await fetchWithAuth(`${API_URL}/user/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar la información del usuario");
      }

      const updatedUserData = await response.json();
      setUser(updatedUserData);
      setIsEditing(false); // Salir del modo edición
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-lg">Cargando...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-lg text-red-500">Error: {error}</div>;

  return (
    <>
      <NavbarUsuario />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuración del Usuario</h1>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
                placeholder="Nombre"
              />
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
                placeholder="Enlace de imagen"
              />
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded ml-2"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div>
              {user ? (
                <>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">{user.country}</p>
                  {user.profile_image && <img src={user.profile_image} alt="Perfil" className="w-24 h-24 rounded-full mt-4" />}
                  <button onClick={handleEdit} className="bg-green-500 text-white py-2 px-4 rounded mt-4">Editar Información</button>
                </>
              ) : (
                <p className="text-gray-600">No se encontraron datos del usuario.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Configuracion;
