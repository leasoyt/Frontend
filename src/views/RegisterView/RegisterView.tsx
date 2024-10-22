"use client";
import { register } from "@/helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/validate";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/Interfaces.types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const RegisterView: React.FC = () => {
  const router = useRouter();
  const initalState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  };

  const [userData, setUserData] = useState<IRegisterProps>(initalState);
  const [errors, setErrors] = useState<IRegisterErrors>(initalState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value, //actualizar dinamicamente solo el campo que se esta modificando
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(userData);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Registro Satisfactorio"
    });
    router.push("/login");
  };

  useEffect(() => {
    const errors = validateRegisterForm(userData);
    setErrors(errors);
  }, [userData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 font-serif ">
        Regístrate
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="mb-6">
  <label
    className="block text-gray-500 mb-2 text-center font-medium text-lg"
    htmlFor="name"
  >
    Nombre
  </label>
  <input
    type="text"
    id="name"
    name="name"
    value={userData.name}
    placeholder="John Doe"
    onChange={handleChange}
    className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
  />
  {/* Mostrar el error solo si hay texto en el input */}
  {userData.name && errors.name && (
    <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
      {errors.name}
    </span>
  )}
</div>


              <div className="mb-6">
        <label
          className="block text-gray-500 mb-2 text-center font-medium text-lg"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          placeholder="agu@gmail.com"
          onChange={handleChange}
          className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
        />
        {/* Mostrar el error solo si hay texto en el input */}
        {userData.email && errors.email && (
          <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
            {errors.email}
          </span>
        )}
        </div>


        <div className="mb-6">
          <label
            className="block text-gray-500 mb-2 text-center font-medium text-lg"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            placeholder="******"
            onChange={handleChange}
            className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
          />
          {userData.password && errors.password && (
            <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
              {errors.password}
            </span>
          )}
        </div>

        <div className="mb-6">
  <label
    className="block text-gray-500 mb-2 text-center font-medium text-lg"
    htmlFor="confirmPassword"
  >
    Confirmar Contraseña
  </label>
  <input
    type="password"
    id="confirmPassword"
    name="confirmPassword"
    value={userData.confirmPassword}
    placeholder="******"
    onChange={handleChange}
    className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
  />
  {/* Mostrar el error solo si hay texto en el input */}
  {userData.confirmPassword && errors.confirmPassword && (
    <span className="text-sm text-red-600" style={{ fontSize: "12px" }}>
      {errors.confirmPassword}
    </span>
  )}
</div>

      

        <button
          type="submit"
          disabled={!!errors.email}
          className="w-44 bg-gray-600 text-white font-medium py-2 rounded-lg hover:bg-gray-800"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterView;
