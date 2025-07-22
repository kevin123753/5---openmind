import { getItem, setItem } from "./localStorage";

export async function handleReaction(questionId, type, storageKey = "reactedQuestions") {
  const reacted = getItem(storageKey) || [];
  const reactionKey = `${type}-${questionId}`;

  if (reacted.includes(reactionKey)) return false;

  try {
    await fetch(`/questions/${questionId}/reaction/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    setItem(storageKey, [...reacted, reactionKey]);
    return true;
  } catch (error) {
    console.error("리액션 서버 전송 실패", error);
    return false;
  }
}
