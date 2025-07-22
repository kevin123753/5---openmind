import { getItem, setItem } from "./localStorage";

const API_BASE = "/api/17-5";

export async function handleReaction(
  questionId,
  type,
  storageKey = "reactedQuestions"
) {
  const reacted = getItem(storageKey) || [];
  const reactionKey = `${type}-${questionId}`;

  console.log("🚀 handleReaction 호출:", { questionId, type, reacted });

  try {
    console.log(
      "📡 API 호출:",
      `${API_BASE}/questions/${questionId}/reaction/`
    );
    const response = await fetch(
      `${API_BASE}/questions/${questionId}/reaction/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      }
    );

    console.log("📡 응답:", { status: response.status, ok: response.ok });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API 실패:", errorText);
      throw new Error(`서버 오류: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ 성공:", data);

    // localStorage 업데이트
    let updated;
    if (reacted.includes(reactionKey)) {
      // 기존 반응이 있으면 제거 (toggle 취소)
      updated = reacted.filter((key) => key !== reactionKey);
      console.log("🗑️ 반응 제거:", updated);
    } else {
      // 기존 반응이 없으면 추가
      // 같은 질문의 다른 반응이 있으면 제거하고 새 반응 추가
      updated = reacted.filter((key) => !key.includes(`-${questionId}`));
      updated.push(reactionKey);
      console.log("➕ 반응 추가:", updated);
    }

    setItem(storageKey, updated);

    // 성공 여부만 반환 (카운트는 클라이언트에서 관리)
    return true;
  } catch (error) {
    console.error("❌ 리액션 처리 실패:", error);
    return false;
  }
}
