import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message, type = "info" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${
        isVisible ? styles.show : ""
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
