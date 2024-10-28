import React, { useState } from 'react';
import { TableStatus } from '@/enums/table.enum';
import { TableWithSetState } from '@/interfaces/Interfaces.types';

const TableObject: React.FC<TableWithSetState> = ({ id, status, order, number, showPopup, setParentState }) => {
    const is_occupied = status === TableStatus.OCCUPIED ? true : false;

    const handleClick = (event: string) => {
        if (showPopup) {
            setParentState(event);
            showPopup();
        }
    };

    const handleSubmit = () => {
        // event?.preventDefault();
        showPopup();
    };

    return (
        <a onClick={() => handleClick(id)} className='cursor-pointer'>
            <div className={`${is_occupied ? 'bg-red-500' : 'bg-blue-500'} w-[100px] h-[100px] flex items-center justify-center`}>
                <h1 className='text-2xl'>{number}</h1>
            </div>

        </a>
    );
};

export default TableObject;
