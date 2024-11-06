export enum HttpMessagesEnum {

    // LOGIN_SUCCESS = "Logeado correctamente",
    LOGIN_FAIL = "Error al iniciar sesión",
    REGISTRATION_FAIL = "Error al registrar el usuario",
    USER_DELETED = "Este usuario fue eliminado!",

    MAIL_IN_USE = "Este correo ya esta en uso!",

    // PASSWORD_UPDATE_SUCCESS = "Contraseña actualizada correctamente",
    PASSWORD_UPDATE_FAILED = "Error al actualizar la contraseña",

    USER_UPDATE_FAILED = "Error al actualizar el usuario",
    RANKING_UP_FAIL = "Error al mejorar el rango del usuario",
    // RANKING_UP_SUCCESS = "El rol de este usuario ha cambiado",
    USER_NOT_FOUND = "Usuario no encontrado",
    NOTHING_UPDATED = "No se ha hecho ninguna actualizacion",
    NO_WAITERS_IN_RESTAURANT = "Aun no hay meseros para este restaurante",

    DISH_CREATION_FAILED = "Error al crear un nuevo plato",
    DISH_UPDATE_FAILED = "Error al actualizar el plato",
    DISH_DELETE_FAIL = "Error al eliminar el plato",
    DISH_NOT_FOUND = "Plato no encontrado",
    // DISH_DELETE_SUCCESS="Plato eliminado correctamente",

    RESTAURANT_CREATION_FAILED = "Error al crear un nuevo restaurante",
    RESTAURANT_UPDATE_FAILED = "Error al actualizar el restaurante",
    RESTAURANT_DELETION_FAILED = "Error al eliminar el restaurante",
    RESTAURANT_NOT_FOUND = "Restaurante no encontrado",
    // RESTAURANT_DELETION_SUCCESS = "Restaurante eliminado correctamente",

    UNKNOWN_ERROR = "Algo salió mal",
    RESOURCE_NOT_FOUND = "Recurso no encontrado",
    UNAUTHORIZED = "Acceso denegado",

    MENU_CATEGORY_DELETE_FAILED = "Error al eliminar la categoría del menú",
    MENU_CATEGORY_CREATION_FAILED = "Error al crear una nueva categoría del menú",
    MENU_CREATION_FAILED = "Error al crear el menú del restaurante",
    MENU_NOT_FOUND = "Menú no encontrado",
    // MENU_CATEGORY_DELETE_SUCCESS = "Categoria eliminada correctamente",

    ORDER_CREATION_FAILED = "Error al crear un nuevo pedido",
    ORDER_UPDATE_FAILED = "Error al actualizar el pedido",
    ORDER_DELETION_FAILED = "Error al eliminar el pedido",
    // ORDER_DELETION_SUCCESS = "Pedido eliminado con éxito",
    ORDER_STATUS_CONFLICT = "Ese es el estado actual del pedido",
    ORDER_NOT_FOUND = "Pedido no encontrado",

    RESERVATION_CREATION_FAIL = "Error al crear una nueva reserva",
    
    TABLE_DELETION_FAIL = "Error al eliminar la mesa",
    // TABLE_DELETION_SUCCESS = "Mesa borrada correctamente",
    TABLE_CREATION_FAIL = "Error al crear una nueva mesa",
    TABLE_NOT_FOUND = "Mesa no encontrada",
    // TABLE_CREATED_SUCCESSFULLY = "Mesa creada correctamente",

    NO_RESERVATIONS_IN_RESTAURANT = "No se encontraron reservas en este establecimiento",
    NO_RESERVATIONS_IN_USER = "No se encontraron reservas de este usuario",
    NO_RESERVATIONS_IN_TABLE = "No se encontraron reservas en esta mesa",

    NO_ORDERS_IN_RESTAURANT = "No se encontraron pedidos en este establecimiento",
    NO_ORDERS_IN_USER = "No se encontraron pedidos de este usuario",
    NO_ORDERS_IN_TABLE = "No se encontraron pedidos en esta mesa",

    NO_TABLES_IN_RESTAURANT = "No se encontraron mesas en este establecimiento",

    TOKEN_EXPIRED = "La sesion ha expirado!",
    TOKEN_NOT_FOUND = "No se encontró ningún token en esta solicitud",
    INSUFFICIENT_PERMISSIONS = "No tienes permisos para hacer eso",
    NOT_ALLOWED_HERE = "No estás permitido aqui!"

}
