import React from 'react';
import { IReservation } from '@/interfaces/reservation.interface';

const ReserveColumn: React.FC<IReservation> = ({ id, date, status, user, table, seats }) => {
    const date_instance = new Date(date);
    const date_only = date_instance.toISOString().split("T")[0];
    const time_only = date_instance.toTimeString().split(" ")[0].slice(0, 5);

    return [
        <td key="user" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user}</td>,
        <td key="date" className="px-6 py-4">{date_only.toString()}</td>,
        <td key="time" className="px-6 py-4">{time_only.toString()}</td>,
        <td key="status" className="px-6 py-4">{status}</td>,
        <td key="table" className="px-6 py-4">
            {table === undefined ? (
                <button className='bg-slate-500 text-white font-light p-1 rounded-md'>Asignar</button>
            ) : table}
        </td>,
        <td key="seats" className="px-6 py-4">{seats}</td>,
        <td key="cancel" className="px-6 py-4">
            <button className='bg-slate-500 text-white font-light p-1 rounded-md'>Cancelar reserva</button>
        </td>
    ];
};

export default ReserveColumn;
