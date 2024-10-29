import { IOrder } from "./order.interface";
import { ITable } from "./table.interface";

export interface IloginProps {
  email: string;
  password: string;
}

export type IErrorsProps = Partial<IloginProps>;
// {
//   email?: string;
//   password?: string;
// }

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage?: string;
}

export type IRegisterErrors = Partial<IRegisterProps>;
// {
//   name?: string;
//   email?: string;
//   password?: string;
//   confirmPassword?: string;
//   profileImage?: string;
// }

export interface CategoryButtonProps {
  name: string;
  color: string;
}

export interface SuggestionCardProps {
  name: string;
  discount: string;
  shipping: string;
  img: string; // URL de la imagen
}

export interface PromoCardProps {
  title: string;
  description: string;
  color: string; // Clase de color para el fondo
}

export interface OptionCardProps {
  name: string;
  discount: string;
  shipping: string;
  img: string; // URL de la imagen
}

export interface AddTableProps {
  showPopup: () => void;
  onSubmit: (data: string) => void;
}

export type ViewTableProps = Pick<AddTableProps, "showPopup"> & {
  id: string;
}

export interface TablesBoardTriggerData {
  id: string;
  table_id: number;
}

export interface VoidCallbackProps {
  updateBoard: () => void;
}

export interface SetStateProps {
  setParentState: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TableWithSetState = ITable & ViewTableProps &  {
  setParentState: React.Dispatch<React.SetStateAction<string>>;
}

export type TableOrderViewProps = IOrder & VoidCallbackProps & {}

export type ClickEvent = React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export interface IUserSession {
  token: string;
  user: {
    name: string;
    email: string;
    password: string;
  };
}

