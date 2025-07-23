import { useState, useEffect, useRef } from "react";
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
  const [toastType, setToastType] = useState("info");
  const [isProcessing, setIsProcessing] = useState(false);

  // 중복 클릭 방지를 위한 ref
  const lastClickTime = useRef(0);
  const processingTimeoutRef = useRef(null);

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

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (message, type = "info") => {
    setToastType(type);
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 1500);
  };

  const reactionEvent = async (clickedType) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;

    console.log("🔄 반응 이벤트:", {
      clickedType,
      currentReaction: userReaction,
      timeSinceLastClick,
      isProcessing,
    });

    // 빠른 연속 클릭 방지 (500ms 이내)
    if (timeSinceLastClick < 500) {
      console.log("❌ 너무 빠른 클릭입니다:", timeSinceLastClick + "ms");
      showToast(
        "너무 빠르게 클릭했습니다. 잠시 후 다시 시도해주세요.",
        "warning"
      );
      return;
    }

    // 이미 반응을 한 경우 → 더 이상 반응 불가
    if (userReaction) {
      console.log("❌ 이미 반응을 완료했습니다:", userReaction);
      const reactionText = userReaction === "like" ? "좋아요" : "싫어요";
      showToast(`이미 ${reactionText}를 눌렀습니다`, "warning");
      return;
    }

    // 처리 중인 경우 → 중복 요청 방지
    if (isProcessing) {
      console.log("❌ 이미 처리 중입니다");
      showToast("처리 중입니다. 잠시만 기다려주세요.", "info");
      return;
    }

    // 마지막 클릭 시간 업데이트
    lastClickTime.current = now;

    setIsProcessing(true);

    // 처리 중 상태를 일정 시간 후 해제 (네트워크 오류 시 대비)
    processingTimeoutRef.current = setTimeout(() => {
      setIsProcessing(false);
    }, 10000); // 10초 후 자동 해제

    try {
      // 새 반응 등록
      console.log("➕ 새 반응 등록:", clickedType);
      const result = await handleReaction(questionId, clickedType);

      // 타이머 정리
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }

      if (!result.success) {
        showToast(result.error || "반응 처리에 실패했습니다", "error");
        return;
      }

      setUserReaction(clickedType);

      // 서버에서 받은 실제 카운트로 업데이트
      if (result.data) {
        console.log("📊 서버 응답 데이터:", result.data);
        setLikeCount(result.data.like || likeCount);
        setDislikeCount(result.data.dislike || dislikeCount);
      } else if (
        result.likeCount !== undefined ||
        result.dislikeCount !== undefined
      ) {
        // handleReaction에서 반환된 카운트 사용
        console.log("📊 handleReaction 응답 카운트:", {
          likeCount: result.likeCount,
          dislikeCount: result.dislikeCount,
        });
        setLikeCount(result.likeCount || likeCount);
        setDislikeCount(result.dislikeCount || dislikeCount);
      } else {
        // 서버 응답이 없는 경우에만 클라이언트에서 증가
        console.log("📊 클라이언트 카운트 증가:", clickedType);
        if (clickedType === "like") {
          setLikeCount((prev) => prev + 1);
        } else {
          setDislikeCount((prev) => prev + 1);
        }
      }

      showToast(
        `${clickedType === "like" ? "좋아요" : "싫어요"}를 눌렀습니다`,
        "success"
      );
    } catch (error) {
      console.error("반응 처리 중 오류:", error);
      showToast("반응 처리에 실패했습니다", "error");
    } finally {
      // 타이머 정리
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.reactionContent}>
      <button
        className={`${styles.item} ${
          userReaction === "like" ? styles.like : ""
        } ${isProcessing ? styles.processing : ""}`}
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
        } ${isProcessing ? styles.processing : ""}`}
        onClick={() => reactionEvent("dislike")}
        disabled={disabled || userReaction !== null || isProcessing}
      >
        <ThumbsDown />
        싫어요
        {/* 싫어요 수치는 UI에서 숨김 */}
      </button>

      {toastMsg && <Toast message={toastMsg} type={toastType} />}
    </div>
  );
};

export default Reaction;
