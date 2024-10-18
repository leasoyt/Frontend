import { IErrorsProps, IloginProps } from "@/interfaces/Interfaces.types";

export function validateLoginForm(values: IloginProps) {
    const errors: IErrorsProps = {}; // creo un objeto para almacenar errores
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) { //si el valor existe pero no cumple  con el formato de un correo electronico valido
      errors.email = "Email is not valid";
    }
    return errors;
  }