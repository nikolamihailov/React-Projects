import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RoleTypes } from "../../types/Role";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please, log in first to access.");
    } else if (user?.role === RoleTypes.Admin && location.pathname === "/appointments") {
      toast.error("Only users and staff can access this page.");
    }
  }, [isAuthenticated, user?.role, location.pathname]);

  if (user?.role === RoleTypes.Admin && location.pathname === "/appointments") {
    return <Navigate to="/home" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?continue=${location.pathname}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
