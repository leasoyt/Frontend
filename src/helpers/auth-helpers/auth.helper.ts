import { IloginProps, IRegisterProps } from "@/interfaces/Interfaces.types";
import Swal from "sweetalert2";
import { API_URL } from "../../config/config";

export async function register(userData: IRegisterProps) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      return await res.json(); // Devuelve el resultado de la respuesta si es exitoso
    } else {
      const errorData = await res.json(); // Intenta obtener el mensaje de error del servidor
      const errorMessage =
        errorData.message || "Registro fallido, por favor intenta nuevamente."; // Mensaje por defecto si no hay uno específico

      // Mostrar el Toast con el mensaje de error personalizado
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
        icon: "error",
        title: "Registro Fallido!",
      });

      // Lanza un error con el mensaje personalizado
      throw new Error(errorMessage);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during registration:", error.message); // Log del error
      throw new Error(error.message); // Lanza el error
    } else {
      throw new Error("Unknown error occurred during registration.");
    }
  }
}

export async function login(userData: IloginProps) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      return res.json();
    } else {
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
        icon: "error",
<<<<<<< HEAD:src/helpers/auth-helpers/auth.helper.ts
        title: "Logeo Fallido!",
=======
        title: "Login Fallido!",
>>>>>>> 3e18b8cf0cbf40e06f7b58b75446def6651db5e3:src/helpers/auth.helper.ts
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Lanza un nuevo error con el mensaje del error original
    } else {
      throw new Error("Unknown error occurred during login.");
    }
  }
}
