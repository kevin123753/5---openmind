import React from "react";
import styles from "./UserCard.module.css";
import Messages from "../Icon/Messages";

const UserCard = () => {
  return (
    <div className={styles.userCard}>
      <img
        src="/image/testImg.jpg"
        alt="user profile"
        className={styles.profileImg}
      />
      <div className={styles.nickname}>아초는 고양이</div>
      <div className={styles.answer}>
        <div className={styles.answerLeft}>
          <Messages />
          <span>받은 질문</span>
        </div>
        <div className={styles.answerRight}>9개</div>
      </div>
    </div>
  );
};

export default UserCard;
