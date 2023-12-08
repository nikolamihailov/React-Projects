import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { NotifContext } from "../contexts/NotificationContext";

const RouteGuardUser = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    if (!isAuthenticated) {
      updateNotifs([{ text: "You are not logged in!", type: "error" }]);
    }
  }, [isAuthenticated, updateNotifs]);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }
};

export default RouteGuardUser;
