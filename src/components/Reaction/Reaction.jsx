import { useState, useEffect } from "react";
import { handleReaction } from "../../utils/reactionUtils";
import { getQuestionListId } from "../../features/post/postService";
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
    const result = await handleReaction(questionId, type);
    if (!result) return;

    setReactState(type);

    try {
      const updated = await getQuestionListId(questionId);
      setLikeCount(updated.like);
      setDislikeCount(updated.dislike);
    } catch (err) {
      console.error("리액션 수치 업데이트 실패", err);
    }
  };

  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${reactState === "like" ? styles.like : ""}`}
        onClick={() => reactionEvent("like")}
        disabled={disabled || reactState !== null}>
        <ThumbsUp />
        좋아요
        <span>{likeCount}</span>
      </button>
      <button
        className={`${styles.item} ${reactState === "dislike" ? styles.dislike : ""}`}
        onClick={() => reactionEvent("dislike")}
        disabled={disabled || reactState !== null}>
        <ThumbsDown />
        싫어요
        <span>{dislikeCount}</span>
      </button>
    </div>
  );
};

export default Reaction;
