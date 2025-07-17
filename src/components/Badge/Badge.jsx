import styles from "./Badge.module.css";

const Badge = ({ badgeActive }) => {
  return (
    <span className={`${styles.badge} ${badgeActive ? styles.active : ""}`}>
      {badgeActive == true ? "답변완료" : "미답변"}
    </span>
  );
};

export default Badge;
