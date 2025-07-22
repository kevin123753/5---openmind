import { useState, useEffect } from "react";
import { handleReaction } from "../../utils/reactionUtils";
import { getQuestionListId } from "../../features/post/postService";
import { getItem, setItem } from "../../utils/localStorage";
import styles from "./Reaction.module.css";
import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";

const Reaction = ({ like, dislike, questionId, disabled }) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [reactState, setReactState] = useState(null);

  // ✅ 초기 반응 상태 확인
  useEffect(() => {
    const reacted = getItem("reactedQuestions") || [];
    if (reacted.includes(`like-${questionId}`)) {
      setReactState("like");
    } else if (reacted.includes(`dislike-${questionId}`)) {
      setReactState("dislike");
    }
  }, [questionId]);

  // ✅ 좋아요 or 싫어요 클릭
  const reactionEvent = async (type) => {
    if (reactState) return; // 이미 반응한 경우 차단

    const success = await handleReaction(questionId, type);
    if (!success) return;

    setReactState(type); // UI 즉시 반영

    // ✅ 로컬스토리지 기록 저장
    const reacted = getItem("reactedQuestions") || [];
    setItem("reactedQuestions", [...reacted, `${type}-${questionId}`]);

    // ✅ 최신 수치 불러오기
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
