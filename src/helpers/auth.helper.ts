import { IloginProps, IRegisterProps } from "@/interfaces/Interfaces.types";
import { API_URL } from "../config/config";

export async function register(userData: IRegisterProps) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      return res.json();
    } else {
      alert("failed to register");
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
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      return res.json();
    } else {
      alert("failed to Log in");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); // Lanza un nuevo error con el mensaje del error original
    } else {
      throw new Error("Unknown error occurred during login.");
    }
  }
}
