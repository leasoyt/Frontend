import Swal from "sweetalert2";
import { ErrorHelper, verifyError } from "../../helpers/errors/error-helper";

export function swalNotifyError(error: ErrorHelper) {
    const verified_error = verifyError(error.message);

    return Swal.fire({
        icon: "error",
        title: verified_error,
        text: error.error,
        allowOutsideClick: false,
    });
}