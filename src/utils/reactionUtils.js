import { getItem, setItem } from "./localStorage";

const API_BASE = "https://openmind-api.vercel.app/17-5";

// API Base URL 검증
console.log("🔧 API_BASE 확인:", API_BASE);

export async function handleReaction(
  questionId,
  type,
  storageKey = "reactedQuestions"
) {
  // 대체 엔드포인트 목록 (API 명세가 다를 경우 대비)
  const ENDPOINT_VARIANTS = [
    `/questions/${questionId}/reactions/`,
    `/questions/${questionId}/reaction/`,
    `/questions/${questionId}/reactions`,
    `/questions/${questionId}/reaction`,
  ];
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
    // 첫 번째 엔드포인트로 시도
    const primaryEndpoint = ENDPOINT_VARIANTS[0];
    const requestUrl = new URL(primaryEndpoint, API_BASE).href;
    const requestBody = { type };

    console.log("🔧 API 요청 준비:", {
      API_BASE,
      questionId,
      type,
      requestUrl,
      isAbsolute: requestUrl.startsWith("http"),
      requestBody,
      endpointVariants: ENDPOINT_VARIANTS,
    });

    console.log("📡 API 호출:", {
      url: requestUrl,
      method: "POST",
      body: requestBody,
      questionId,
      type,
    });

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
      mode: "cors",
      credentials: "omit",
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
        method: "POST",
        body: requestBody,
        questionId,
        type,
      });

      // 404 에러인 경우 엔드포인트 문제임을 명시
      if (response.status === 404) {
        console.error("❌ 404 에러 상세 정보:", {
          requestUrl,
          API_BASE,
          questionId,
          type,
          responseHeaders: Object.fromEntries(response.headers.entries()),
          responseUrl: response.url,
        });

        throw new Error(
          `엔드포인트 오류: ${requestUrl} 엔드포인트를 찾을 수 없습니다. (${response.status} ${response.statusText})`
        );
      }

      // 405 에러인 경우 메서드 문제임을 명시
      if (response.status === 405) {
        throw new Error(
          `메서드 오류: POST가 허용되지 않습니다. (${response.status} ${response.statusText})`
        );
      }

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
      // 서버에서 반환된 최신 like/dislike 카운트 포함
      likeCount: data.like || 0,
      dislikeCount: data.dislike || 0,
    };
  } catch (error) {
    console.error("❌ 리액션 처리 실패:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
