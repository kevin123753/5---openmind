import { useState, useEffect } from "react";
import { handleReaction } from "../../utils/reactionUtils";
import { getItem } from "../../utils/localStorage";
import styles from "./Reaction.module.css";
import ThumbsUp from "../Icon/ThumbsUp";
import ThumbsDown from "../Icon/ThumbsDown";
import Toast from "../Toast/Toast";

const Reaction = ({ like = 0, dislike = 0, questionId, disabled }) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [userReaction, setUserReaction] = useState(null); // "like" | "dislike" | null
  const [toastMsg, setToastMsg] = useState("");

  // 컴포넌트 마운트 시 localStorage에서 사용자의 반응 상태 확인
  useEffect(() => {
    const reacted = getItem("reactedQuestions") || [];
    if (reacted.includes(`like-${questionId}`)) {
      setUserReaction("like");
    } else if (reacted.includes(`dislike-${questionId}`)) {
      setUserReaction("dislike");
    }
  }, [questionId]);

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 1500);
  };

  const reactionEvent = async (clickedType) => {
    console.log("🔄 반응 이벤트:", {
      clickedType,
      currentReaction: userReaction,
    });

    // 같은 버튼을 다시 누른 경우 → 반응 취소
    if (userReaction === clickedType) {
      console.log("❌ 반응 취소:", clickedType);

      const success = await handleReaction(questionId, clickedType);
      if (!success) return;

      setUserReaction(null);

      // 취소 시 해당 타입의 카운트를 -1 감소
      if (clickedType === "like") {
        setLikeCount((prev) => prev - 1);
      } else {
        setDislikeCount((prev) => prev - 1);
      }

      showToast(
        `${clickedType === "like" ? "좋아요" : "싫어요"}를 취소했습니다`
      );
      return;
    }

    // 다른 버튼을 누른 경우 → 기존 반응 취소 후 새 반응 등록
    if (userReaction && userReaction !== clickedType) {
      console.log("🔄 반응 변경:", { from: userReaction, to: clickedType });

      // 기존 반응 취소
      const cancelSuccess = await handleReaction(questionId, userReaction);
      if (cancelSuccess) {
        // 기존 반응 카운트 -1 감소
        if (userReaction === "like") {
          setLikeCount((prev) => prev - 1);
        } else {
          setDislikeCount((prev) => prev - 1);
        }
      }
    }

    // 새 반응 등록
    console.log("➕ 새 반응 등록:", clickedType);
    const success = await handleReaction(questionId, clickedType);
    if (!success) return;

    setUserReaction(clickedType);

    // 새 반응 카운트 +1 증가
    if (clickedType === "like") {
      setLikeCount((prev) => prev + 1);
    } else {
      setDislikeCount((prev) => prev + 1);
    }

    showToast(`${clickedType === "like" ? "좋아요" : "싫어요"}를 눌렀습니다`);
  };

  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${
          userReaction === "like" ? styles.like : ""
        }`}
        onClick={() => reactionEvent("like")}
        disabled={disabled}
      >
        <ThumbsUp />
        좋아요
        <span>{likeCount}</span>
      </button>
      <button
        className={`${styles.item} ${
          userReaction === "dislike" ? styles.dislike : ""
        }`}
        onClick={() => reactionEvent("dislike")}
        disabled={disabled}
      >
        <ThumbsDown />
        싫어요
        {/* 싫어요 수치는 UI에서 숨김 */}
      </button>

      {toastMsg && <Toast message={toastMsg} />}
    </div>
  );
};

export default Reaction;
