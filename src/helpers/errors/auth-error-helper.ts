import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { ErrorHelper } from "./error-helper";
import { swalNotifyError } from "../../scripts/swal/swal-notify-error";
import { Pages } from "@/enums/pages.enum";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthErrorHelper(error: any) {
  if (error.message === HttpMessagesEnum.INSUFFICIENT_PERMISSIONS) {

    swalNotifyError(new ErrorHelper(HttpMessagesEnum.INSUFFICIENT_PERMISSIONS, "")).then((result) => {
      if (result.isConfirmed) {
        window.location.href = Pages.SEARCH;

      }
    });

    return true;
  } else if (error.message === HttpMessagesEnum.TOKEN_EXPIRED) {
    swalNotifyError(new ErrorHelper(HttpMessagesEnum.TOKEN_EXPIRED, "Cerrando sesion")).then((result) => {
      if (result.isConfirmed) {
        window.location.href = Pages.LOGIN;
        localStorage.clear();

      }
    });

    return true;
  } else if (error.message === HttpMessagesEnum.RESTAURANT_NOT_FOUND) {

    swalNotifyError(new ErrorHelper(HttpMessagesEnum.NOT_ALLOWED_HERE, "")).then((result) => {
      if (result.isConfirmed) {
        console.log("first");
        window.location.href = Pages.SEARCH;

      }
    });

    return true;
  } else //if (error.message !== HttpMessagesEnum.UNKNOWN_ERROR) 
  {
    // console.log("UNknown here")

    return false;
    // } else {
    //   console.log(error);
  }
}