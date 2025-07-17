import React from "react";
import styles from "./UserCard.module.css";
import Messages from "./Messages";

const UserCard = ({ subject, onClick, imageUrl }) => {
  return (
    <div className={styles.userCard} onClick={onClick}>
      <img src={imageUrl} alt="user profile" className={styles.profileImg} />
      <div className={styles.nickname}>{subject?.name || "아초는 고양이"}</div>
      <div className={styles.answer}>
        <div className={styles.answerLeft}>
          <Messages />
          <span>받은 질문</span>
        </div>
        <div className={styles.answerRight}>
          {subject?.questionCount || "9개"}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
