import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      toast.error("Logout to access this");
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  if (!isAuthenticated) {
    return <Outlet />;
  }
};

export default PublicRoute;
