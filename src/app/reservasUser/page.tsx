"use client";

import React, { useEffect, useState } from "react";
import NavbarUsuario from "@/components/NavbarUsuario/NavbarUsuario";
import Footer from "@/components/Footer/Footer";
import UserProfileView from "../../views/UserProfileView/UserProfileView";
import { API_URL } from "@/config/config";
import { useLocalStorage } from "@/helpers/auth-helpers/useLocalStorage";
import { IUser } from "@/interfaces/user.interface";
import { IReservation } from "@/interfaces/reservation.interface";
import { swalNotifyConfirmation } from "@/helpers/swal/swal-notify-confirm";
import { swalNotifySuccess } from "@/helpers/swal/swal-notify-success";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";
import { fetchWithAuth } from "@/helpers/token-expire.interceptor";
import ReserveColumn from "@/components/AdminDash/Reservation/ReserveColumn";

interface User {
  id: string; // Agrega el ID para identificar al usuario en la actualización
  name: string;
  email: string;
  country: string;
}

const Configuracion = () => {
    const [iuser, setUser] = useLocalStorage("userSession", "");
    const user: Partial<IUser> = iuser.user;
    const [reservation, setReservation] = useState<IReservation[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);


  const handleDelete = (id: string) => {

    const fetchThis = () => {
        
        swalNotifyConfirmation("¿Estas Seguro?", "Finalizar orden").then(async (result) => {

            if (result.isConfirmed) {

                try {
                    await fetchWithAuth(`${API_URL}/reservation/delete/${id}`, {
                        method: "DELETE"
                    });

                    swalNotifySuccess("Reservacion eliminada!", "");
                    setUpdate(true);
                } catch (error) {
                    AuthErrorHelper(error);
                }
            }
        });
        
    };

    fetchThis();
};

  useEffect(() => {
    const fetchReservas = async () => {
      const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
      const token = userSession?.token;

      if (!token) {
        setError("No se encontró un token de autenticación.");
        setLoading(false);
        return;
      }


      try {
        const response = await fetch(`${API_URL}/reservation/user/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

      

        const data = await response.json();
        console.log('data',data);
        
        setReservation(data);
        setError(null);
      } catch (err) {
        console.error("Error en fetchUser:", err);
        setError("Error de conexión al servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);



  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <NavbarUsuario />
      <h2 className="text-4xl font-semibold mb-4 text-center p-5 text-black">
        Lista de Reservas
      </h2>
      <ul className="bg-white rounded-lg overflow-hidden">
        {(Array.isArray(reservation) ? reservation : []).map((reser) => (
          
          
          <tr key={reser.id}>
          <ReserveColumn {...reser} toDelete={handleDelete} />
      </tr>
        ))}
      </ul>
      <Footer />
    </>
  );
};

export default Configuracion;
