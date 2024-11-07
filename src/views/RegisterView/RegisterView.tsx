"use client";
import { register } from "@/helpers/auth-helpers/auth.helper";
import { validateRegisterForm } from "@/helpers/auth-helpers/validate";
import { IRegisterErrors, IRegisterProps } from "@/interfaces/Interfaces.types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { swalNotifyUnknownError } from "@/helpers/swal/swal-notify-unknown-error";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { useLocalStorage } from "@/helpers/auth-helpers/useLocalStorage";
import { IUser } from "@/interfaces/user.interface";
import { useUser } from "@auth0/nextjs-auth0/client";

const RegisterView: React.FC = () => {
  const router = useRouter();
  const initalState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  };
  const { user, isLoading, error } = useUser();

  const [userData, setUserData] = useState<IRegisterProps>(initalState);
  const [errors, setErrors] = useState<IRegisterErrors>(initalState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [iuser, setUser] = useLocalStorage("userSession", "");
  // const user: Partial<IUser> = iuser.user;
  const [isAllowed, setIsAllowed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };


  useEffect(() => {
    if (iuser.token === null || iuser.token === undefined) {
      setIsAllowed(true);

    } else {
      setIsAllowed(false);

    }
    console.log(user);
  }, [iuser, user]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return; // Evitar múltiples clics rápidos
    setIsSubmitting(true);

    const currentErrors = validateRegisterForm(userData);
    setErrors(currentErrors);

    if (Object.values(currentErrors).some((error) => error)) {
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: "Por favor corrige los errores antes de continuar.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await register(userData);
    } catch (error: any) {
      if (error instanceof ErrorHelper) {
        swalNotifyError(error);
      } else {
        swalNotifyUnknownError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAllowed(true);

    if(user) {
      window.location.href = "/api/auth/logout";
    }

  };

  return (
    <>
      <Navbar />
      {
        isAllowed ?
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
                {userData.name && errors.name && (
                  <span
                    className="text-sm text-red-600"
                    style={{ fontSize: "12px" }}
                  >
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
                  onChange={handleChange}
                  placeholder="agu@gmail.com"
                  className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
                />
                {userData.email && errors.email && (
                  <span
                    className="text-sm text-red-600"
                    style={{ fontSize: "12px" }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Contraseña */}
              <div className="mb-6 relative">
                <label
                  className="block text-gray-500 mb-2 text-center font-medium text-lg"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="******"
                    className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
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

                {userData.password && errors.password && (
                  <span
                    className="text-sm text-red-600"
                    style={{ fontSize: "12px" }}
                  >
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <div>
                  <label
                    className="block text-gray-500 mb-2 text-center font-medium text-lg"
                    htmlFor="confirmPassword"
                  >
                    Confirmar Contraseña
                  </label>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    placeholder="******"
                    className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-200 focus:outline-none text-black font-sans"
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
                {userData.confirmPassword && errors.confirmPassword && (
                  <span
                    className="text-sm text-red-600"
                    style={{ fontSize: "12px" }}
                  >
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !userData.name ||
                  !userData.email ||
                  !userData.password ||
                  !userData.confirmPassword ||
                  !!errors.name ||
                  !!errors.email ||
                  !!errors.password ||
                  !!errors.confirmPassword
                }
                className="w-44 bg-gray-600 text-white font-medium py-2 rounded-lg hover:bg-gray-800 mt-5"
              >
                {isSubmitting ? "Registrando..." : "Registrarse"}
              </button>
              <a href="/api/auth/login" className="w-44 bg-gray-700 text-white font-medium py-2 rounded-lg hover:bg-gray-800 ml-4 inline-block text-center">
  Registrarse con Auth0
</a>
            </form>
          </div>
          :
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
            <button
              onClick={handleLogout}
              type="button"
              className="w-44 bg-gray-700 text-white font-medium py-2 rounded-lg hover:bg-gray-800 ml-4"
            >
              Cerrar Sesion
            </button>
          </div>
      }

      <Footer />
    </>
  );
};

export default RegisterView;
