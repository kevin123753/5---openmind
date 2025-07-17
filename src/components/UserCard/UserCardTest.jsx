import React from "react";
import UserCard from "./UserCard";
import styles from "./UserCard.module.css";

const UserCardTest = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardGrid}>
        {/* 8개의 UserCard 컴포넌트 출력 -> 하드코딩임 */}
        {[...Array(8)].map((_, index) => (
          <UserCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default UserCardTest;
