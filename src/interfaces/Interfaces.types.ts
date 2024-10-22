export interface IloginProps {
  email: string;
  password: string;
}

export interface IErrorsProps {
  email?: string;
  password?: string;
}

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage?: string;
}

export interface IRegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  profileImage?: string;
}

export interface CategoryButtonProps  {
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