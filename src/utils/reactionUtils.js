import { getItem, setItem } from "./localStorage";

const API_BASE = "https://openmind-api.vercel.app/17-5";

export async function handleReaction(
  questionId,
  type,
  storageKey = "reactedQuestions"
) {
  const reacted = getItem(storageKey) || [];
  const reactionKey = `${type}-${questionId}`;

  console.log("🚀 handleReaction 호출:", { questionId, type, reacted });

  // 이미 반응을 한 경우 → 더 이상 반응 불가
  if (reacted.some((key) => key.includes(`-${questionId}`))) {
    console.log("❌ 이미 반응을 완료했습니다:", reacted);
    return {
      success: false,
      error: "이미 반응을 완료했습니다",
    };
  }

  try {
    const requestUrl = `${API_BASE}/questions/${questionId}/reaction/`;
    const requestBody = { type };

    console.log("📡 API 호출:", {
      url: requestUrl,
      method: "PATCH",
      body: requestBody,
      questionId,
      type,
    });

    const response = await fetch(requestUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    console.log("📡 응답:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API 실패:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: requestUrl,
        body: requestBody,
      });
      throw new Error(`서버 오류: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ 성공:", data);

    // localStorage 업데이트 - 한 번만 반응 가능하므로 추가만
    const updated = [...reacted, reactionKey];
    console.log("➕ 반응 추가:", updated);
    setItem(storageKey, updated);

    // 성공 여부와 서버 응답 데이터 반환
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("❌ 리액션 처리 실패:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
