import Swal from "sweetalert2";
import { ErrorHelper, verifyError } from "./errorHelper";
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";

export function swalNotifyError(error: ErrorHelper) {
    const verified_error = verifyError(error.message);
    let message: string;

    switch (verified_error) {
        case HttpMessagesEnum.LOGIN_FAIL:
            message = "Error al iniciar sesión";
            break;
        // case HttpMessagesEnum.LOGIN_SUCCESS:
        //     message = "Sesión iniciada correctamente";
        //     break;
        case HttpMessagesEnum.REGISTRATION_FAIL:
            message = "Error al registrar el usuario";
            break;
        // case HttpMessagesEnum.REGISTRATION_SUCCESS:
        //     message = "Registro exitoso";
        //     break;
        // case HttpMessagesEnum.PASSWORD_UPDATE_SUCCESS:
        //     message = "Contraseña actualizada exitosamente";
        //     break;
        case HttpMessagesEnum.PASSWORD_UPDATE_FAILED:
            message = "Error al actualizar la contraseña";
            break;
        case HttpMessagesEnum.USER_UPDATE_FAILED:
            message = "Error al actualizar el usuario";
            break;
        // case HttpMessagesEnum.USER_UPDATE_SUCCESS:
        //     message = "Usuario actualizado correctamente";
        //     break;
        case HttpMessagesEnum.RANKING_UP_FAIL:
            message = "Error al promocionar al usuario";
            break;
        case HttpMessagesEnum.USER_NOT_FOUND:
            message = "Usuario no encontrado";
            break;
        case HttpMessagesEnum.DISH_CREATION_FAILED:
            message = "Error al crear un nuevo plato";
            break;
        case HttpMessagesEnum.DISH_UPDATE_FAILED:
            message = "Error al actualizar el plato";
            break;
        // case HttpMessagesEnum.DISH_UPDATE_SUCCESS:
        //     message = "Plato actualizado correctamente";
        //     break;
        // case HttpMessagesEnum.DISH_DELETE_SUCCESS:
        //     message = "Plato eliminado correctamente";
        //     break;
        case HttpMessagesEnum.DISH_DELETE_FAIL:
            message = "Error al eliminar el plato";
            break;
        case HttpMessagesEnum.DISH_NOT_FOUND:
            message = "Plato no encontrado";
            break;
        case HttpMessagesEnum.RESTAURANT_CREATION_FAILED:
            message = "Error al crear un nuevo restaurante";
            break;
        // case HttpMessagesEnum.RESTAURANT_UPDATE_SUCCESS:
        //     message = "Restaurante actualizado correctamente";
        //     break;
        case HttpMessagesEnum.RESTAURANT_UPDATE_FAILED:
            message = "Error al actualizar el restaurante";
            break;
        case HttpMessagesEnum.RESTAURANT_DELETION_FAILED:
            message = "Error al eliminar el restaurante";
            break;
        // case HttpMessagesEnum.RESTAURANT_DELETION_SUCCESS:
        //     message = "Restaurante eliminado correctamente";
        //     break;
        case HttpMessagesEnum.RESTAURANT_NOT_FOUND:
            message = "Restaurante no encontrado";
            break;
        case HttpMessagesEnum.UNKNOWN_ERROR:
            message = "Algo salió mal";
            break;
        case HttpMessagesEnum.RESOURCE_NOT_FOUND:
            message = "Recurso no encontrado";
            break;
        case HttpMessagesEnum.UNAUTHORIZED:
            message = "Acceso denegado";
            break;
        case HttpMessagesEnum.MENU_CATEGORY_DELETE_FAILED:
            message = "Error al eliminar la categoría del menú";
            break;
        // case HttpMessagesEnum.MENU_CATEGORY_DELETE_SUCCESS:
        //     message = "Categoría del menú eliminada correctamente";
        //     break;
        case HttpMessagesEnum.MENU_CATEGORY_CREATION_FAILED:
            message = "Error al crear una nueva categoría de menú";
            break;
        case HttpMessagesEnum.MENU_CREATION_FAILED:
            message = "Error al crear el menú del restaurante";
            break;
        case HttpMessagesEnum.MENU_NOT_FOUND:
            message = "Menú no encontrado";
            break;
        case HttpMessagesEnum.ORDER_CREATION_FAILED:
            message = "Error al crear un nuevo pedido";
            break;
        case HttpMessagesEnum.ORDER_UPDATE_FAILED:
            message = "Error al actualizar el pedido";
            break;
        case HttpMessagesEnum.ORDER_DELETION_FAILED:
            message = "Error al eliminar el pedido";
            break;
        // case HttpMessagesEnum.ORDER_DELETION_SUCCESS:
        //     message = "Pedido eliminado correctamente";
        //     break;
        case HttpMessagesEnum.ORDER_STATUS_CONFLICT:
            message = "Ese es el estado actual del pedido";
            break;
        case HttpMessagesEnum.ORDER_NOT_FOUND:
            message = "Pedido no encontrado";
            break;
        case HttpMessagesEnum.RESERVATION_CREATION_FAIL:
            message = "Error al crear una nueva reserva";
            break;
        // case HttpMessagesEnum.TABLE_DELETION_SUCCESS:
        //     message = "Mesa eliminada correctamente";
        //     break;
        case HttpMessagesEnum.TABLE_DELETION_FAIL:
            message = "Error al eliminar la mesa";
            break;
        case HttpMessagesEnum.TABLE_CREATION_FAIL:
            message = "Error al crear una nueva mesa";
            break;
        case HttpMessagesEnum.TABLE_NOT_FOUND:
            message = "Mesa no encontrada";
            break;
        // case HttpMessagesEnum.TABLE_CREATED_SUCCESSFULLY:
        //     message = "Mesa creada correctamente";
        //     break;
        case HttpMessagesEnum.NO_RESERVATIONS_IN_RESTAURANT:
            message = "No se encontraron reservas en este establecimiento";
            break;
        case HttpMessagesEnum.NO_RESERVATIONS_IN_USER:
            message = "No se encontraron reservas para este usuario";
            break;
        case HttpMessagesEnum.NO_RESERVATIONS_IN_TABLE:
            message = "No se encontraron reservas para esta mesa";
            break;
        case HttpMessagesEnum.NO_ORDERS_IN_RESTAURANT:
            message = "No se encontraron pedidos en este establecimiento";
            break;
        case HttpMessagesEnum.NO_ORDERS_IN_USER:
            message = "No se encontraron pedidos para este usuario";
            break;
        case HttpMessagesEnum.NO_ORDERS_IN_TABLE:
            message = "No se encontraron pedidos para esta mesa";
            break;
        case HttpMessagesEnum.NO_TABLES_IN_RESTAURANT:
            message = "No se encontraron mesas en este establecimiento";
            break;
        case HttpMessagesEnum.TOKEN_EXPIRED:
            message = "¡La sesión ha expirado!";
            break;
        default:
            message = "Error desconocido";
            break;

    }

    Swal.fire({
        icon: "error",
        title: message,
        text: error.error,
    });
}