import React from "react";
import styles from "./UserCard.module.css";

const UserCard = ({ subject, onClick, imageUrl }) => {
  return (
    <div className={styles.userCard} onClick={onClick}>
      <img src={imageUrl} alt="user profile" className={styles.profileImg} />
      <div className={styles.nickname}>{subject?.name}</div>
      <div className={styles.answer}>
        <div className={styles.answerLeft}>
          <span>받은 질문</span>
        </div>
        <div className={styles.answerRight}>{subject?.questionCount}</div>
      </div>
    </div>
  );
};

export default UserCard;
