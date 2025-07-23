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
  const [isProcessing, setIsProcessing] = useState(false);

  // props가 변경될 때 카운트 업데이트
  useEffect(() => {
    setLikeCount(like);
    setDislikeCount(dislike);
  }, [like, dislike]);

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

    // 이미 반응을 한 경우 → 더 이상 반응 불가
    if (userReaction) {
      console.log("❌ 이미 반응을 완료했습니다:", userReaction);
      showToast("이미 반응을 완료했습니다");
      return;
    }

    // 처리 중인 경우 → 중복 요청 방지
    if (isProcessing) {
      console.log("❌ 이미 처리 중입니다");
      return;
    }

    setIsProcessing(true);

    try {
      // 새 반응 등록
      console.log("➕ 새 반응 등록:", clickedType);
      const result = await handleReaction(questionId, clickedType);

      if (!result.success) {
        showToast("반응 처리에 실패했습니다");
        return;
      }

      setUserReaction(clickedType);

      // 서버에서 받은 실제 카운트로 업데이트
      if (result.data) {
        setLikeCount(result.data.like || likeCount);
        setDislikeCount(result.data.dislike || dislikeCount);
      } else {
        // 서버 응답이 없는 경우에만 클라이언트에서 증가
        if (clickedType === "like") {
          setLikeCount((prev) => prev + 1);
        } else {
          setDislikeCount((prev) => prev + 1);
        }
      }

      showToast(`${clickedType === "like" ? "좋아요" : "싫어요"}를 눌렀습니다`);
    } catch (error) {
      console.error("반응 처리 중 오류:", error);
      showToast("반응 처리에 실패했습니다");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${
          userReaction === "like" ? styles.like : ""
        }`}
        onClick={() => reactionEvent("like")}
        disabled={disabled || userReaction !== null || isProcessing}
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
        disabled={disabled || userReaction !== null || isProcessing}
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
