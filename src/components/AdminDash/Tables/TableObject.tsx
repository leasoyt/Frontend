import React from 'react';
import { IReservation } from '@/interfaces/reservation.interface';
import { ITable } from '@/interfaces/table.interface';
import { TableStatus } from '@/enums/table.enum';

const TableObject: React.FC<ITable> = ({ id, status, order, number }) => {
    const is_occupied = status === TableStatus.OCCUPIED ? true : false;
    return (
        <div className={`${is_occupied ? 'bg-red-500' : 'bg-blue-500'} w-[100px] h-[100px] flex items-center justify-center`}>
            <h1 className='text-2xl'>{number}</h1>
        </div>
    );
};

export default TableObject;
