import { useState, useEffect } from "react";
import { handleReaction } from "../../utils/reactionUtils";
import styles from "./Reaction.module.css";
import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";

const Reaction = ({ like, dislike, questionId }) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);

  const handleClick = (type) => {
    const success = handleReaction(questionId, type);

    if (!success) return;

    if (type === "like") setLikeCount((prev) => prev + 1);
    else if (type === "dislike") setDislikeCount((prev) => prev + 1);
  };
  useEffect(() => {
    setLikeCount(like);
    setDislikeCount(dislike);
  }, [like, dislike]);
  return (
    <div className={styles.reactionContent}>
      <button className={`${styles.item} ${likeCount !== 0 ? styles.like : ""}`} onClick={() => handleClick("like")}>
        <ThumbsUp />
        좋아요
        <span>{likeCount}</span>
      </button>
      <button
        className={`${styles.item} ${dislikeCount !== 0 ? styles.dislike : ""}`}
        onClick={() => handleClick("dislike")}>
        <ThumbsDown />
        싫어요
        <span>{dislikeCount}</span>
      </button>
    </div>
  );
};

export default Reaction;
