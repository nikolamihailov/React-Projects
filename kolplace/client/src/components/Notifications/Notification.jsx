import { useEffect, useState } from "react";
import styles from "./Notification.module.css";

const DURATION = 5000;

// Toast: icon, message, close button and a bar showing the time left.
const Notification = ({ text, type }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isError = type === "error";

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(false), DURATION);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles["toast"]} ${styles[isError ? "error" : "success"]}`}
      role={isError ? "alert" : "status"}
    >
      <i className={`fa-solid ${isError ? "fa-circle-exclamation" : "fa-circle-check"}`} aria-hidden="true"></i>
      <p>{text}</p>
      <button type="button" className={styles["close"]} onClick={() => setIsVisible(false)} aria-label="Dismiss">
        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
      <div className={styles["progress"]}></div>
    </div>
  );
};

export default Notification;
