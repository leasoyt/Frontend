import { IUpdateStock } from '@/interfaces/Interfaces.types';
import React, { useState, useEffect, useRef } from 'react';

const UpdateStock: React.FC<{ triggerer: IUpdateStock, onSubmit: (data: IUpdateStock) => void }> = ({ triggerer, onSubmit }) => {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleUpdateStock = (event: React.MouseEvent) => {
        event.stopPropagation();
        onSubmit({ stock: !triggerer.stock, id: triggerer.id });
        setIsVisible(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div 
        ref={buttonRef}
        className="relative inline-block">
            <button
                onClick={toggleVisibility}
                className="bg-slate-500 text-white font-light p-1 rounded-md"
            >
                {triggerer.stock ? "Si" : "No"}

            </button>

            {isVisible && (
                <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-white hover:bg-gray-200 text-gray-900 p-2 rounded-md shadow-lg whitespace-nowrap">
                    <button onClick={(e) => handleUpdateStock(e)} className="px-2 py-1 text-black-800">{triggerer.stock ? "No" : "Si"}</button>
                </span>
            )}
        </div>
    );
};

export default UpdateStock;