import { IloginProps, IRegisterProps } from "@/interfaces/Interfaces.types";

export async function register(userData: IRegisterProps) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "contente-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      return res.json();
    } else {
      alert("failed to register")
    }
  } catch (error:any) {
    throw new Error (error);
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
  } catch (error: any) {
    throw new Error(error);
  }
}
