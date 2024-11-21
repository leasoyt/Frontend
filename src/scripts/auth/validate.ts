import { IloginProps, IRegisterProps, IRestaurantRegisterProps } from "@/interfaces/Interfaces.types";

export function validateLoginForm(values: IloginProps) {
  const errors: Partial<IloginProps> = {}; // creo un objeto para almacenar errores
  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    //si el valor existe pero no cumple  con el formato de un correo electronico valido
    errors.email = "El email no es valido";
  }
  if (!values.email) {
    errors.email = "El email es obligatorio";
  }
  if (!values.password) {
    errors.password = "La constraseña es obligatoria";
  } else if (values.password.length < 6) {
    errors.password = "La constraseña debe tener al menos 6 carateres"
  }
  return errors;
}

export function validateRegisterForm(values: IRegisterProps) {
  const errors: Partial<IRegisterProps> = {};
  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no es valido";
  }
  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  }
  if (!values.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "La contraseña debe incluir al menos una letra mayúscula";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "La contraseña debe incluir al menos un número";
  }
  else if (!/[!@#$%^&*]/.test(values.password)) {
    errors.password = "La contraseña debe incluir al menos un carácter especial (!@#$%^&*)";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }
  if (
    values.profileImage &&
    !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
      values.profileImage
    )
  ) {
    errors.profileImage = "La URL de la imagen no es válida";
  }
  return errors;
}

export function validateRestaurantForm(values: IRestaurantRegisterProps) {
  const errors: Partial<IRestaurantRegisterProps> = {};

  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  } else if (values.name.length < 3 || values.name.length > 30) {
    errors.name = "El nombre debe ser entre 3 y 30 caracteres";
  }

  if (!values.address) {
    errors.address = "La direccion es obligatoria";
  } else if (values.address.length < 5 || values.address.length > 40) {
    errors.address = "La direccion debe ser entre 6 y 40 caracteres"
  }

  if(values.description.length > 120) {
    errors.description = "La descripcion no puede contener mas 500 caracteres"
  }

  return errors;
}
