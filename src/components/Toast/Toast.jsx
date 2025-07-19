import styles from "./Toast.module.css";

const Toast = ({ message }) => {
  return <div className={styles.toast}>{message}</div>;
};

export default Toast;
