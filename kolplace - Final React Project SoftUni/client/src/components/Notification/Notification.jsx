import { useEffect, useState } from "react";
import styles from "./Notification.module.css";

const Notification = ({ text, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to trigger the unmounting process after 5 seconds
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Clean up the timeout when the component unmounts or when the timeout triggers
    return () => clearTimeout(timeoutId);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  // Return null if the component should be hidden
  if (!isVisible) {
    return null;
  }
  const classes = `notification-${
    type === "error" ? "error" : "success"
  }`;
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
