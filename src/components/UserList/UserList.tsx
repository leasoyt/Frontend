'use client'

// pages/admin/components/UserList.tsx
import { useEffect, useState } from 'react';
import { API_URL } from "../../config/config";
import { IUser } from '@/interfaces/user.interface';


const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    // Lógica para obtener usuarios desde la API (dummy por ahora)
    const fetchUsers = async () => {
      const response = await fetch(`${API_URL}/user/all`); // Ruta de ejemplo
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleBanUser = async (id: string) => {
    try {
      await fetch(`/api/users/${id}/ban`, { method: 'POST' });
      setUsers(users.map(u => (u.id === id ? { ...u, status: 'Banned' } : u)));
    } catch (error) {
      console.error('Error al banear usuario:', error);
    }
  };

  return (
    <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
    <ul className="bg-white rounded-lg shadow-lg overflow-hidden">
        {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center p-4 border-b">
                <span>{user.name} - {user.email} ({user.status})</span>
                {user.status !== 'Banned' && (
                    <button
                        onClick={() => handleBanUser(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Banear
                    </button>
                )}
            </li>
        ))}
    </ul>
</div>

  );
};

export default UserList;
