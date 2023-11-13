import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  register,
  login,
} from "../data/services/userService";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage(
    "kolplace-auth",
    {}
  );
  const [errors, setErrors] = useState([]);

  const navigateTo = useNavigate();

  const onRegisterSubmit = async (values) => {
    setErrors([]);
    const userData = await register(values);

    if (userData.errors) {
      setErrors(Object.values(userData.errors));
    } else {
      setAuth(userData);
      setErrors([]);
      navigateTo("/");
    }
  };

  const onLoginSubmit = async (values) => {
    setErrors([]);
    const userData = await login(values);

    if (userData.errors) {
      setErrors(Object.values(userData.errors));
    } else {
      setAuth(userData);
      setErrors([]);
      navigateTo("/");
    }
  };
  const ctxValues = {
    onRegisterSubmit,
    onLoginSubmit,
    errors,
    isAuthenticated: !!auth.token,
    isAdmin: auth.role === "admin",
    auth,
  };
  return (
    <AuthContext.Provider value={ctxValues}>
      {children}
    </AuthContext.Provider>
  );
};
