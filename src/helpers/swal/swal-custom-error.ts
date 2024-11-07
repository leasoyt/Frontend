import Swal from "sweetalert2";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function swalNotifyCustomError(title: string, text?: string) {
    return Swal.fire({
        icon: "error",
        title: title,
        text: text || "",
        allowOutsideClick: false
    });
}