import { IloginProps, IRegisterProps } from "@/interfaces/Interfaces.types";
import { API_URL } from "../../config/config";
import { ErrorHelper, verifyError } from "../error-helper";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { swalNotifySuccess } from "../swal-notify-success";

export async function register(userData: IRegisterProps) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.ok && res.status === 200) {
      swalNotifySuccess("¡Registrado correctamente!", "");
      window.location.href = "/login";

      return await res.json();
    } else if (res.status === 409) {

      throw new ErrorHelper(HttpMessagesEnum.MAIL_IN_USE, "409");
    }

    const error = await res.json();
    throw new ErrorHelper(verifyError(error.message), error.error);

  } catch (error) {
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

    if (!res.ok) {
      const error = await res.json();
      throw new ErrorHelper(verifyError(error.message), error.status);

    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
