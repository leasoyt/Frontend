import { AddTableProps } from '@/interfaces/Interfaces.types';
import React, { useState } from 'react';

const AddTablePopUp: React.FC<AddTableProps> = ({ showPopup, onSubmit }) => {
    const [data, setData] = useState('');

    const exitPopup = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        if (event.target === event.currentTarget) {
            if (showPopup) {
                showPopup();
            }
        }
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        onSubmit(data);
        showPopup();
    };

    return (
        <div onClick={exitPopup} className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Agregar mesa</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Numero de mesa:</label>
                        <input
                            type="number"
                            name="table_id"
                            value={data}
                            required
                            min="1"
                            max="1000"
                            onChange={(e) => setData(e.target.value)}
                            className="w-full p-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={exitPopup}
                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg py-1.5 px-4 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTablePopUp;