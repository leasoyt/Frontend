"use client";
import { useEffect, useState } from 'react';
import { API_URL } from '../../../config/config';
import ReserveColumn from './ReserveColumn';
import { IReservation } from '@/interfaces/reservation.interface';
import { HttpMessagesEnum } from '@/enums/httpMessages.enum';
import { fetchWithAuth } from '@/helpers/token-expire.interceptor';
import { ErrorHelper, verifyError } from '@/helpers/errors/error-helper';
import { AuthErrorHelper } from '@/helpers/errors/auth-error-helper';
import { swalNotifyConfirmation } from '@/helpers/swal/swal-notify-confirm';
import { swalNotifySuccess } from '@/helpers/swal/swal-notify-success';

const ReservationsColumns: React.FC<{ id: string }> = ({ id }) => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
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
        const fetchReservations = async () => {
            setUpdate(false);
            setLoading(true);
            setError(null);

            try {
                const response = await fetchWithAuth(`${API_URL}/reservation/restaurant/${id}`, { method: "GET" });

                // if (!!response) {
                //     throw new ErrorHelper(verifyError(response.message), response.status);
                // }

                setReservations(response || []);
            } catch (error) {
                if (error instanceof ErrorHelper) {
                    if (error.message === HttpMessagesEnum.NO_RESERVATIONS_IN_RESTAURANT) {
                        setError("No hay reservas por ahora!");
                    }

                } else {
                    AuthErrorHelper(error);
                }

            }

            setLoading(false);
        };

        fetchReservations();
    }, [id, update]);

    if (loading) return <td colSpan={6} className="text-center py-4 text-gray-500">Cargando...</td>;
    if (error) return <td colSpan={6} className="text-center py-4 text-gray-500">{error}</td>;

    return (
        <tbody>
            {reservations.map((reservation) => (
                <tr key={reservation.id}>
                    <ReserveColumn {...reservation} toDelete={handleDelete} />
                </tr>
            ))}
        </tbody>
    );
};

export default ReservationsColumns;
