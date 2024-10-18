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
