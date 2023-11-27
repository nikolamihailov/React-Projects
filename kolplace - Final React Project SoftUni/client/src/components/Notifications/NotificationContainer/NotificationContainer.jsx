import { useContext } from "react";
import styles from "./NotifsContainer.module.css";
import Notification from "../Notification";
import { NotifContext } from "../../../contexts/NotificationContext";
import { v4 as uuidv4 } from "uuid";

const NotificationContainer = () => {
  const { notifications } = useContext(NotifContext);
  return (
    <div className={styles["notifs-container"]}>
      {notifications?.length > 0 &&
        notifications?.map((n) => (
          <Notification text={n.text} type={n.type} key={uuidv4()} />
        ))}
    </div>
  );
};

export default NotificationContainer;
