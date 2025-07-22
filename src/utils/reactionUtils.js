// import { getItem, setItem } from "./localStorage";

// export async function handleReaction(
//   questionId,
//   type,
//   storageKey = "reactedQuestions"
// ) {
//   const reacted = getItem(storageKey) || [];
//   const reactionKey = `${type}-${questionId}`;

//   if (reacted.includes(reactionKey)) return false;

//   try {
//     await fetch(`/questions/${questionId}/reaction/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ type }),
//     });

//     setItem(storageKey, [...reacted, reactionKey]);
//     return true;
//   } catch (error) {
//     console.error("리액션 서버 전송 실패", error);
//     return false;
//   }
// }

import { getItem, setItem } from "./localStorage";

const API_BASE = "/api/17-5";

export async function handleReaction(
  questionId,
  type,
  storageKey = "reactedQuestions"
) {
  const reacted = getItem(storageKey) || [];
  const reactionKey = `${type}-${questionId}`;

  // 🛑 서버는 취소 기능이 없으므로, 이미 반응했으면 막기
  if (reacted.includes(reactionKey)) return null;

  try {
    const response = await fetch(
      `${API_BASE}/questions/${questionId}/reaction/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      }
    );

    if (!response.ok) throw new Error("서버 오류");

    const data = await response.json();

    // 이전 반응 제거 (반대 타입 제거)
    const updated = reacted.filter((key) => !key.includes(`${questionId}`));
    updated.push(reactionKey);
    setItem(storageKey, updated);

    return {
      like: data.like,
      dislike: data.dislike,
      yourReaction: type,
    };
  } catch (error) {
    console.error("❌ 리액션 전송 실패:", error);
    return null;
  }
}
