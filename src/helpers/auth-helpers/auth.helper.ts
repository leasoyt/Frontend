import { IloginProps, IRegisterProps } from "@/interfaces/Interfaces.types";
import { API_URL } from "../../config/config";
import { ErrorHelper, verifyError } from "../error-helper";

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
      const error = await res.json(); // Intenta obtener el mensaje de error del servidor
      // const errorMessage = errorData.message || "Registro fallido, por favor intenta nuevamente."; // Mensaje por defecto si no hay uno específico
      throw new ErrorHelper(verifyError(error.message), error.error);

    }
  } catch (error: unknown) {
    throw error;
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

    }

    const error = await res.json();
    throw new ErrorHelper(verifyError(error.message), error.error);

  } catch (error) {

    throw error;

  }
}
