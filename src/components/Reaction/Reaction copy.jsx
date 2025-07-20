import { useEffect, useState } from "react";
import { postReaction } from "../../features/post/postService";
import { getItem, setItem } from "../../utils/localStorage";
import styles from "./Reaction.module.css";

import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";

const Reaction = ({ like, dislike, questionId }) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const votedMap = getItem("votedMap") || {};
    if (votedMap[questionId]) {
      setVoted(true);
    }
  }, [questionId]);

  const handleReaction = async (type) => {
    if (voted) return;

    try {
      const updated = await postReaction(questionId, type);
      setLikeCount(updated.like);
      setDislikeCount(updated.dislike);
      setVoted(true);

      const votedMap = getItem("votedMap") || {};
      votedMap[questionId] = true;
      setItem("votedMap", votedMap);
    } catch (err) {
      console.error("리액션 실패", err.message);
    }
  };

  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${likeCount !== 0 ? styles.like : ""}`}
        disabled={voted}
        onClick={() => handleReaction("like")}>
        <ThumbsUp />
        좋아요
        <span>{likeCount}</span>
      </button>
      <button
        className={`${styles.item} ${dislikeCount !== 0 ? styles.dislike : ""}`}
        disabled={voted}
        onClick={() => handleReaction("dislike")}>
        <ThumbsDown />
        싫어요
        <span>{dislikeCount}</span>
      </button>
    </div>
  );
};

export default Reaction;
