import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("kolplace-auth", {});

  const updateAuth = (data) => {
    setAuth(data);
  };

  const ctxValues = {
    isAuthenticated: !!auth.token,
    isAdmin: auth.role === "admin",
    auth,
    updateAuth,
  };
  return (
    <AuthContext.Provider value={ctxValues}>{children}</AuthContext.Provider>
  );
};
