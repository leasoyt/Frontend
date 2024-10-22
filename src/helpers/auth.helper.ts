import { IloginProps, IRegisterProps } from "@/interfaces/Interfaces.types";
import Swal from "sweetalert2";
// import { API_URL } from "../config/config";

export async function register(userData: IRegisterProps) {
  try {
    const res = await fetch(`http://localhost:4000/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
        }
      });
      Toast.fire({
        icon: "error",
        title: "Registro Fallido!"
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Lanza un nuevo error con el mensaje del error original
    } else {
      throw new Error("Unknown error occurred during registration.");
    }
  }
}

export async function login(userData: IloginProps) {
  try {
    const res = await fetch(`http://localhost:4000/auth/login`, {
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
        }
      });
      Toast.fire({
        icon: "error",
        title: "Logeo Fallido!"
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
