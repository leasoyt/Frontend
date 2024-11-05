"use client";
import React from "react";

const NewMeseroForm = () => {

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    return (
        <div className="p-6 bg-gray-100  max-w-lg mx-auto">
            <h1 className="italic font-bold text-2xl text-gray-800 mb-4">Registrar mesero</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Nombre:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full italic text-gray-800"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="border border-gray-300 rounded-md p-2 w-full italic text-gray-800"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Contraseña:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="border border-gray-300 rounded-md p-2 w-full italic text-gray-800"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Confirmar Contraseña:</label>
                    <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        className="border border-gray-300 rounded-md p-2 w-full italic text-gray-800"
                    />
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
                    >
                        Registrar
                    </button>
                </div>
            </form>
        </div>

    );
};

export default NewMeseroForm;
