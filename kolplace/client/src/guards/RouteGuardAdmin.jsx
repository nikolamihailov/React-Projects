import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { NotifContext } from "../contexts/NotificationContext";
import AdminPanel from "../components/Admin/Admin";

const RouteGuardAdmin = () => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    if (!isAuthenticated) {
      updateNotifs([{ text: "You are not logged in!", type: "error" }]);
    } else if (isAuthenticated && role !== "admin") {
      updateNotifs([{ text: "You are not admin!", type: "error" }]);
    }
  }, [isAuthenticated, role, updateNotifs]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  } else if (role !== "admin") {
    return <Navigate to={"/"} />;
  } else {
    return (
      <AdminPanel>
        <Outlet />
      </AdminPanel>
    );
  }
};

export default RouteGuardAdmin;
