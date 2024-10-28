"use client";
import { useEffect, useState } from 'react';
import { API_URL } from '../../../config/config';
import ReserveColumn from './ReserveColumn';
import { IReservation } from '@/interfaces/reservation.interface';
import { HttpMessagesEnum } from '@/enums/httpMessages.enum';

const ReservationsColumns: React.FC = () => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            setError(null);

            try {
                const response: Response = await fetch(`${API_URL}/reservation/restaurant/aefa8479-7091-4f72-8fef-e0f59e8457f5`, {method: "GET"});

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }

                const data = await response.json();

                setReservations(data || []);
            } catch (error) {

                if (error instanceof Error) {
                    if (error.message === HttpMessagesEnum.NO_RESERVATIONS_IN_RESTAURANT) {
                        setError("No hay reservas por ahora!");

                    } else {
                        setError(error.message);
                    }

                } else {
                    setError("Error desconocido");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <tbody>
            {reservations.map((reservation) => (
                <tr key={reservation.id}>
                    <ReserveColumn {...reservation} />
                </tr>
            ))}
        </tbody>
    );
};

export default ReservationsColumns;
