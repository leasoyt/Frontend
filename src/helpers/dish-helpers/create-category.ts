import { API_URL } from "@/config/config";
import { IMenu_Category } from "@/interfaces/menu.interface";
import { swalNotifySuccess } from "../swal/swal-notify-success";
import { swalNotifyError } from "../swal/swal-notify-error";
import { ErrorHelper, verifyError } from "../errors/error-helper";
import { swalNotifyUnknownError } from "../swal/swal-notify-unknown-error";
import { fetchWithAuth } from "../token-expire.interceptor";

export async function createCategory(id: string, categoryData: Partial<IMenu_Category>) {

  try {
    // const userSession = localStorage.getItem("userSession");
    // const token = userSession ? JSON.parse(userSession).token : null;

    // if (!token) {
      // throw new ErrorHelper(HttpMessagesEnum.TOKEN_NOT_FOUND, "401");
    // }

    const response = await fetchWithAuth(`${API_URL}/menu-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData)
    })

    if (!response.ok) {
      const error = await response.json();
      throw new ErrorHelper(verifyError(error.message), error.statusCode);
    }

    const data = await response.json();

    swalNotifySuccess("Categoria creada", `La categoria ${data.name} ha sido creada.`);

    return data;

  } catch (error) {
    if (error instanceof ErrorHelper) {
      swalNotifyError(error);
    } else {
      swalNotifyUnknownError(error);
    }
  }
}