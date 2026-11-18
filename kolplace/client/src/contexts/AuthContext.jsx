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
    isAdmin: auth.user?.role === "admin",
    auth,
    role: auth.user?.role,
    updateAuth,
    email: auth.user?.email,
  };
  return (
    <AuthContext.Provider value={ctxValues}>{children}</AuthContext.Provider>
  );
};
