import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { ErrorHelper, verifyError } from "./error-helper";

export async function fetchWithAuth(url: string | URL | globalThis.Request, options: RequestInit) {
    const userSession = localStorage.getItem("userSession");
    const token = userSession ? JSON.parse(userSession).token : null;

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    if (token!) {
        try {
            const response = await fetch(url, { ...options, headers });
            const data = await response.json();

            if (response.status === 401) {
                throw new ErrorHelper(HttpMessagesEnum.TOKEN_EXPIRED, "401");
            } else if(!response.ok) {
                throw new ErrorHelper(verifyError(data.message), data.status);
            }

            return data;
        } catch (error) {
            throw error;
        }

    } else {
        throw new ErrorHelper(HttpMessagesEnum.TOKEN_NOT_FOUND, "401");
    }

}