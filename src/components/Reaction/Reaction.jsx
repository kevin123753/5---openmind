import { useState, useEffect } from "react";
import { handleReaction } from "../../utils/reactionUtils";
import { getQuestionListId } from "../../features/post/postService";
import { getItem } from "../../utils/localStorage"; // localStorage.getItem wrapper
import styles from "./Reaction.module.css";
import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";

const Reaction = ({ like, dislike, questionId, disabled }) => {
  let [likeCount, setLikeCount] = useState(like);
  let [dislikeCount, setDislikeCount] = useState(dislike);
  let [reactState, setReactState] = useState(null);

  // useEffect(() => {
  //   async function fetchLatest() {
  //     try {
  //       const updated = await getQuestionListId(questionId);
  //       setLikeCount(updated.like);
  //       setDislikeCount(updated.dislike);
  //     } catch (e) {
  //       console.error("리액션 최신값 가져오기 실패", e);
  //     }
  //   }

  //   fetchLatest();
  // }, [questionId]);

  useEffect(() => {
    const reacted = getItem("reactedQuestions") || [];
    if (reacted.includes(`like-${questionId}`)) {
      setReactState("like");
    } else if (reacted.includes(`dislike-${questionId}`)) {
      setReactState("dislike");
    }
  }, [questionId]);

  const reactionEvent = (type) => {
    const result = handleReaction(questionId, type);
    console.log(result);
    if (!result) return;
    setReactState(type);

    if (type === "like") {
      setLikeCount(likeCount + 1);
    } else if (type === "dislike") {
      setDislikeCount(dislikeCount + 1);
    }
  };
  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${reactState === "like" || likeCount !== 0 ? styles.like : ""}`}
        onClick={() => reactionEvent("like")}
        disabled={disabled}>
        <ThumbsUp />
        좋아요
        <span>{likeCount}</span>
      </button>
      <button
        className={`${styles.item} ${reactState === "dislike" || dislikeCount !== 0 ? styles.dislike : ""}`}
        disabled={disabled}
        onClick={() => reactionEvent("dislike")}>
        <ThumbsDown />
        싫어요
        <span>{dislikeCount}</span>
      </button>
    </div>
  );
};

export default Reaction;
