"use client";
import { login } from "@/helpers/auth-helpers/auth.helper";
import { validateLoginForm } from "@/helpers/auth-helpers/validate";
import { IErrorsProps, IloginProps } from "@/interfaces/Interfaces.types";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importa los iconos
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";

const LoginView: React.FC = () => {
  
  const router = useRouter ();
  const initialState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<IloginProps>(initialState);
  const [errors, setErrors] = useState<IErrorsProps>(initialState);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login(userData);
      const { token, user } = response;

      localStorage.setItem("userSession", JSON.stringify({ token, user }));

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: "success",
        title: "Logeo Satisfactorio",
      });

      setUserData(initialState); // Limpia los inputs después del login exitoso
      router.push("/pageUser");

    } catch (error:unknown) {
      // Muestra un mensaje de error y limpia los inputs si el login falla
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Login fallido. Intenta nuevamente.",
      });
      setUserData(initialState); // Limpia los inputs después de un error
    }
  };

  useEffect(() => {
    const errors = validateLoginForm(userData);
    setErrors(errors);
  }, [userData]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif ">
        Rest0
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-6">
          <label
            className="block text-gray-500 mb-2 text-center font-medium text-lg"
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="email"
            value={userData.email}
            placeholder="Rest012"
            onChange={handleChange}
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
          {userData.email && errors.email && (
            <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
              {errors.email}
            </span>
          )}
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-500 text-lg mb-2 text-center font-medium"
            htmlFor="password"
          >
            Contraseña
          </label>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Cambia entre texto y password
            id="password"
            name="password"
            value={userData.password}
            placeholder="******"
            onChange={handleChange}
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} // Toggle mostrar/ocultar
          >
            {showPassword ? (
              <FaEyeSlash style={{ color: "black" }} />
            ) : (
              <FaEye style={{ color: "black" }} />
            )}
          </div>
          </div>
          
          {userData.password && errors.password && (
            <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
              {errors.password}
            </span>
          )}
        </div>
        <button
          type="submit"
           disabled={Object.values(errors).some(error => error)}
          className="w-44 bg-gray-600 text-white font-medium py-2 rounded-lg hover:bg-gray-800"
        >
          Ingresar
        </button>
      </form>
    </div>
    </>
  );
};

export default LoginView;
