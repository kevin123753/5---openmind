import { useState, useEffect } from "react";
import { handleReaction } from "../../utils/reactionUtils";
import { getItem } from "../../utils/localStorage";
import styles from "./Reaction.module.css";
import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";
import Toast from "../Toast/Toast"; // ✅ Toast 공통 컴포넌트 가져오기

const Reaction = ({ like = 0, dislike = 0, questionId, disabled }) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [reactState, setReactState] = useState(null); // "like" | "dislike"
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const reacted = getItem("reactedQuestions") || [];
    if (reacted.includes(`like-${questionId}`)) {
      setReactState("like");
    } else if (reacted.includes(`dislike-${questionId}`)) {
      setReactState("dislike");
    }
  }, [questionId]);

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 1500);
  };

  const reactionEvent = async (type) => {
    if (reactState) {
      const label = reactState === "like" ? "좋아요" : "싫어요";
      showToast(`이미 ${label}를 누르셨어요`);
      return;
    }

    const result = await handleReaction(questionId, type);
    if (!result) return;

    setReactState(type);
    setLikeCount(result.like);
    setDislikeCount(result.dislike);
  };

  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${reactState === "like" ? styles.like : ""}`}
        onClick={() => reactionEvent("like")}
        disabled={disabled}
      >
        <ThumbsUp />
        좋아요
        <span>{likeCount}</span>
      </button>
      <button
        className={`${styles.item} ${
          reactState === "dislike" ? styles.dislike : ""
        }`}
        onClick={() => reactionEvent("dislike")}
        disabled={disabled}
      >
        <ThumbsDown />
        싫어요
        <span>{dislikeCount}</span>
      </button>

      {toastMsg && <Toast message={toastMsg} />}
    </div>
  );
};

export default Reaction;
