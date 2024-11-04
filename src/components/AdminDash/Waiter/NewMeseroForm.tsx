import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewMeseroForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <div className="p-6 bg-gray-100  max-w-lg mx-auto">
    <h1 className="italic font-bold text-2xl text-gray-800 mb-4">Registrar mesero</h1>
    <h2 className="italic text-gray-700 mb-4">Información:</h2>
    <form>
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
            <label className="block text-gray-700 font-medium mb-1">Teléfono:</label>
            <input
                id="phone"
                name="phone"
                type="number"
                className="border border-gray-300 rounded-md p-2 w-full italic text-gray-800"
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Contraseña:</label>
            <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="border border-gray-300 rounded-md p-2 w-full italic text-gray-800"
            />
             <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash style={{ color: "black" }} />
                ) : (
                  <FaEye style={{ color: "black" }} />
                )}
              </div>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Confirmar Contraseña:</label>
            <input
                id="confirm-password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                className="border border-gray-300 rounded-md p-2 w-full italic text-gray-800"
            />
               <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash style={{ color: "black" }} />
                ) : (
                  <FaEye style={{ color: "black" }} />
                )}
              </div>
        </div>
        <div className="mt-6">
            <button
                type="button"
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
