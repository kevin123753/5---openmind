import styles from "./Toast.module.css";

const Toast = () => {
  return <p className={`${styles.toast} shadow-3`}>URL이 복사되었습니다</p>;
};

export default Toast;
