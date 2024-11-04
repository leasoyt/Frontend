import {
  IErrorsProps,
  IloginProps,
  IRegisterErrors,
  IRegisterProps,
} from "@/interfaces/Interfaces.types";

export function validateLoginForm(values: IloginProps) {
  const errors: IErrorsProps = {}; // creo un objeto para almacenar errores
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
  const errors: IRegisterErrors = {};
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
