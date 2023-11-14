import { createContext, useCallback, useState } from "react";

export const NotifContext = createContext();

export const NotifProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const updateNotifs = useCallback((data) => {
    setNotifications(data);
  }, []);

  const ctxValues = {
    notifications,
    updateNotifs,
  };
  return (
    <NotifContext.Provider value={ctxValues}>{children}</NotifContext.Provider>
  );
};
