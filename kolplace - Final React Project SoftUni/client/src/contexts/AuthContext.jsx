import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigateTo = useNavigate();
  const onRegisterSubmit = (values) => {
    console.log(values);
    navigateTo("/");
  };
  const onLoginSubmit = (values) => {
    console.log(values);
    //navigateTo("/");
  };
  const ctxValues = {
    onRegisterSubmit,
    onLoginSubmit,
  };
  return (
    <AuthContext.Provider value={ctxValues}>
      {children}
    </AuthContext.Provider>
  );
};
