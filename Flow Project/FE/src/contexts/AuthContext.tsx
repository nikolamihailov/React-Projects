import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useLoggedUser } from "../hooks/users/useLoggedUser";
import { LoggedUser } from "../types/User";

interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
  logoutExpiredSession: () => void;
  updateLoggedUser: () => void;
  deletedUserAccount: () => void;
  user: LoggedUser | undefined;
  token: string | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<{ token: string } | null>(() => {
    const storedToken = localStorage.getItem("auth");
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const { data: user, refetch, isLoading } = useLoggedUser(token?.token || "");

  const loginUser = useCallback(
    (token: string) => {
      setToken({ token });
      localStorage.setItem("auth", JSON.stringify({ token }));
      refetch();
    },
    [refetch]
  );

  const logoutUser = useCallback(() => {
    setToken(null);
    localStorage.removeItem("auth");
    toast.success("Successfully logged out!");
  }, []);

  const logoutExpiredSession = useCallback(() => {
    setToken(null);
    localStorage.removeItem("auth");
    toast.error("Your session has expired");
  }, []);

  const updateLoggedUser = useCallback(() => {
    refetch();
  }, [refetch]);

  const deletedUserAccount = useCallback(() => {
    setToken(null);
    localStorage.removeItem("auth");
  }, []);

  const values = {
    user,
    isAuthenticated: !!token,
    loginUser,
    logoutUser,
    logoutExpiredSession,
    token: token?.token,
    isLoading,
    updateLoggedUser,
    deletedUserAccount,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
