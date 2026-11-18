import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { NotifContext } from "../contexts/NotificationContext";

const RouteGuardLoginRegister = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    if (isAuthenticated) {
      updateNotifs([
        { text: "You need to logout to access login/register!", type: "error" },
      ]);
    }
  }, [isAuthenticated, updateNotifs]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }
};

export default RouteGuardLoginRegister;
