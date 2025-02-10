import { createContext, useEffect, useState } from "react";
import {
  AuthContextProviderProps,
  AuthContextType,
  loginForm,
} from "../Auth/Models/Auth";
import { jwtDecode } from "jwt-decode";

export let AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  let [userData, setUserData] = useState<loginForm | null>(null);

  let saveUserData = () => {
    let encodedToken = localStorage.getItem("userToken");
    if (encodedToken) {
      let decodedToken = jwtDecode<loginForm>(encodedToken);
      setUserData(decodedToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
