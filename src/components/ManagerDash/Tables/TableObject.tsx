import React, { useState } from 'react';
import { TableStatus } from '@/enums/table.enum';
import { TableWithSetState } from '@/interfaces/Interfaces.types';

const TableObject: React.FC<TableWithSetState
    & { setNumberParentState: React.Dispatch<React.SetStateAction<number>> }> =
    ({ id, status, order, number, showPopup, setParentState, setNumberParentState }) => {

        const is_occupied = status === TableStatus.OCCUPIED ? true : false;

        const handleClick = (id: string, table_number: number) => {
            if (showPopup) {
                setNumberParentState(table_number);
                setParentState(id);
                showPopup();
            }
        };

        return (
            <a onClick={() => handleClick(id, number)} className='cursor-pointer'>
                <div className={`${is_occupied ? 'bg-red-500' : 'bg-blue-500'} w-[100px] h-[100px] flex items-center justify-center rounded-md`}>
                    <h1 className='text-2xl'>{number}</h1>
                </div>
            </a>
        );
    };

export default TableObject;
