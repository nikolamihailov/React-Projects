import { useEffect, useState } from "react";
import styles from "./Notification.module.css";

const Notification = ({ text, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isVisible) {
    return null;
  }
  const classes = `notification-${type === "error" ? "error" : "success"}`;
  const startType = type === "error" ? "X" : "✓";
  return (
    <div className={styles[classes]}>
      <span>{startType}</span>
      <p>{text}</p>
      <div className={styles["progress"]}></div>
    </div>
  );
};

export default Notification;
