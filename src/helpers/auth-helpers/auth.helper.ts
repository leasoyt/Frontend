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
      const data = await res.json();

      // Almacenar el token en localStorage
      localStorage.setItem(
        "userSession",
        JSON.stringify({ token: data.token })
      );

      // Decodificar el token para obtener el user_id
      const payload = data.token.split(".")[1]; // Obtiene la segunda parte del token
      const decodedPayload = JSON.parse(atob(payload)); // Decodifica de Base64
      const userId = decodedPayload.id; // Extrae el user_id

      // Almacenar el user_id en localStorage
      localStorage.setItem("userId", userId);

      return data; // Retorna la respuesta para que pueda ser utilizada si es necesario
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
        title: "Login Fallido!",
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
