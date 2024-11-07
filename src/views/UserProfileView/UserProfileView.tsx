"use client";

import React, { useState } from "react";

interface UserProfileProps {
  user: {
    id: string; // Asegúrate de tener acceso al `id` del usuario.
    name: string;
    email: string;
    country: string;
    
  } | null;
}

const UserProfileView: React.FC<UserProfileProps> = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [country, setCountry] = useState(user?.country || "");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdateUserProfile = async () => {
    if (!user) {
      return;
    }

    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const token = userSession?.token;

    if (!token) {
      setError("No se encontró un token de autenticación.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, country }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("No autorizado: token inválido o expirado.");
        } else {
          setError("Ocurrió un error al actualizar la información del usuario.");
        }
        return;
      }

      const data = await response.json();
      setSuccess("Información actualizada con éxito.");
      setError(null);
    } catch (err) {
      console.error("Error al actualizar la información del usuario:", err);
      setError("Error de conexión al servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {user ? (
        <>
          <div>
            <label className="text-lg font-semibold text-gray-800">
              Nombre:
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border text-gray-500  rounded p-1 w-full mt-1"
              />
            ) : (
              <p className="text-lg text-gray-800  font-semibold">{user.name}</p>
            )}
          </div>
          <div>
            <label className="text-lg font-semibold text-gray-800">
              Email:
            </label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border text-gray-500  rounded p-1 w-full mt-1"
              />
            ) : (
              <p className="text-lg  text-gray-800  font-semibold">{user.email}</p>
            )}
          </div>
          <div>
            <label className="text-lg font-semibold text-gray-800">
              País:
            </label>
            {isEditing ? (
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border text-gray-500 rounded p-1 w-full mt-1"
              />
            ) : (
              <p className="text-lg text-gray-800  font-semibold">{user.country}</p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          {isEditing && (
            <button
              onClick={handleUpdateUserProfile}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Guardar cambios
            </button>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </>
      ) : (
        <div className="text-lg font-semibold">
          No se encontró información del usuario.
        </div>
      )}
    </div>
  );
};

export default UserProfileView;

