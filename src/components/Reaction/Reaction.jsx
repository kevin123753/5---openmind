import { useState, useEffect } from "react";
import { handleReaction } from "../../utils/reactionUtils";
import { getItem } from "../../utils/localStorage";
import styles from "./Reaction.module.css";
import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";

const Reaction = ({ like, dislike, questionId, disabled }) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [reactState, setReactState] = useState(null);

  useEffect(() => {
    const reacted = getItem("reactedQuestions") || [];
    if (reacted.includes(`like-${questionId}`)) {
      setReactState("like");
    } else if (reacted.includes(`dislike-${questionId}`)) {
      setReactState("dislike");
    }
  }, [questionId]);

  const reactionEvent = async (type) => {
    if (reactState) return;

    const updated = await handleReaction(questionId, type);
    if (!updated) return;

    setReactState(type);
    setLikeCount(updated.like);
    setDislikeCount(updated.dislike);
  };

  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${reactState === "like" ? styles.like : ""}`}
        onClick={() => reactionEvent("like")}
        disabled={disabled}>
        <ThumbsUp />
        좋아요
        <span>{likeCount}</span>
      </button>
      <button
        className={`${styles.item} ${reactState === "dislike" ? styles.dislike : ""}`}
        onClick={() => reactionEvent("dislike")}
        disabled={disabled}>
        <ThumbsDown />
        싫어요
        <span>{dislikeCount}</span>
      </button>
    </div>
  );
};

export default Reaction;
