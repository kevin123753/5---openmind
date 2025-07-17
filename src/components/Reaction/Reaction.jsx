import { useState } from "react";

import styles from "./Reaction.module.css";

import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";

const Reaction = ({ like, dislike }) => {
  let [likeCount, setLikeCount] = useState(like);
  let [dislikeCount, setDislikeCount] = useState(dislike);
  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${likeCount !== 0 ? styles.like : ""}`}
        onClick={() => setLikeCount(++likeCount)}>
        <ThumbsUp />
        좋아요
        <span>{likeCount}</span>
      </button>
      <button
        className={`${styles.item} ${dislikeCount !== 0 ? styles.dislike : ""}`}
        onClick={() => setDislikeCount(++dislikeCount)}>
        <ThumbsDown />
        싫어요
        <span>{dislikeCount}</span>
      </button>
    </div>
  );
};

export default Reaction;
