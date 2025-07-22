import { getItem, setItem } from "./localStorage";

const API_BASE = "/api/17-5";

export async function handleReaction(
  questionId,
  type,
  storageKey = "reactedQuestions"
) {
  const reacted = getItem(storageKey) || [];
  const reactionKey = `${type}-${questionId}`;

  if (reacted.includes(reactionKey)) return null; // ❌ 이미 누른 경우 무시

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

    const updated = [...reacted, reactionKey];
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
