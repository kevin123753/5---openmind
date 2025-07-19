import { getItem, setItem } from "./localStorage";

export function handleReaction(questionId, type, storageKey = "reactedQuestions") {
  const reacted = getItem(storageKey) || [];

  const reactionKey = `${type}-${questionId}`;
  if (reacted.includes(reactionKey)) return false;

  fetch(`/questions/${questionId}/reaction/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }),
  });

  setItem(storageKey, [...reacted, reactionKey]);
  return true;
}
