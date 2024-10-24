"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  profile_image: string;
}

const UserProfileView = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:4000/user/${id}`, {
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
        
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>País:</strong> {user.country}</p>
          <Image 
            src={user.profile_image} 
            alt="Imagen de perfil" 
            width={150} // ancho
            height={150} // altura
            priority // Opcional: Usa esto si la imagen es importante para LCP
          />
        </div>
      ) : (
        <div>No se encontró información del usuario.</div>
      )}
    </div>
  );
};

export default UserProfileView;
