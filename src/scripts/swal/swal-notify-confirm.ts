import Swal from "sweetalert2";

export function swalNotifyConfirmation(title: string, text: string) {
    return Swal.fire({
        icon: "success",
        title: title,
        text: text === "" ? undefined : text,
        showConfirmButton: true,
        cancelButtonText: "Volver",
        showCancelButton: true,
    });
}