import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("kolplace-auth", {});

  const updateAuth = useCallback(
    (data) => {
      setAuth(data);
    },
    [setAuth]
  );

  const ctxValues = {
    isAuthenticated: !!auth.token,
    isAdmin: auth?.role === "admin",
    auth,
    updateAuth,
    email: auth?.email,
  };
  return (
    <AuthContext.Provider value={ctxValues}>{children}</AuthContext.Provider>
  );
};
