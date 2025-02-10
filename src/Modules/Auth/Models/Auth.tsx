import { ReactNode } from "react";

export interface loginForm {
  email: string;
  password?: string;
  password_new?: string;
  otp?: string;
}

export interface registerForm {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: string;
}

//   Context
export interface AuthContextType {
  userData: loginForm | null;
  saveUserData: () => void;
}
export interface AuthContextTypeUser {
  userData: loginForm | null;
}
export interface AuthContextProviderProps {
  children: ReactNode;
}
