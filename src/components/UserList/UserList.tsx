'use client'

// pages/admin/components/UserList.tsx
import { useEffect, useState } from 'react';
import { API_URL } from "../../config/config";
import { IUser } from '@/interfaces/user.interface';

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/user/all`);
        if (!response.ok) throw new Error("Error al obtener los usuarios");
        const data = await response.json();
        console.log(data); // Verifica que sea un array con los datos correctos
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error("Error al borrar el usuario");
      }
      // Actualizar el estado eliminando el usuario borrado
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error al borrar el usuario:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-black">Lista de Usuarios</h2>
      <ul className="bg-white rounded-lg shadow-lg overflow-hidden">
        {users.length === 0 ? (
          <p className="text-center p-4 text-black">No hay usuarios para mostrar.</p>
        ) : (
          users.map((user) => (
            <li key={user.id} className="flex justify-between items-center p-4 border-b text-black ">
              <span>{user.name} - {user.email}</span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Borrar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;
