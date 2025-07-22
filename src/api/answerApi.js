const BASE_URL = "https://openmind-api.vercel.app/17-5";

export async function postAnswer(questionId, { content, isRejected }) {
  console.log("🚀 postAnswer API 호출:", {
    url: `${BASE_URL}/questions/${questionId}/answers/`,
    body: { content, isRejected },
  });

  const res = await fetch(`${BASE_URL}/questions/${questionId}/answers/`, {
    method: "POST",
    body: JSON.stringify({ content, isRejected }),
    headers: { "Content-Type": "application/json" },
  });

  console.log("📡 postAnswer 응답:", {
    status: res.status,
    statusText: res.statusText,
    ok: res.ok,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ postAnswer 실패:", errorText);
    throw new Error(`답변 등록 실패: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  console.log("✅ postAnswer 성공:", result);
  return result;
}
export async function deleteAnswer(answerId) {
  const res = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("답변 삭제 실패");
  return;
}

export async function putAnswer(answerId, { content, isRejected }) {
  console.log("🚀 putAnswer API 호출:", {
    url: `${BASE_URL}/answers/${answerId}/`,
    body: { content, isRejected },
  });

  const res = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: "PUT",
    body: JSON.stringify({ content, isRejected }),
    headers: { "Content-Type": "application/json" },
  });

  console.log("📡 putAnswer 응답:", {
    status: res.status,
    statusText: res.statusText,
    ok: res.ok,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ putAnswer 실패:", errorText);
    throw new Error(`답변 수정 실패: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  console.log("✅ putAnswer 성공:", result);
  return result;
}

export async function deleteAllQuestionsBySubject(subjectId) {
  try {
    const res = await fetch(`${BASE_URL}/subjects/${subjectId}/questions/`);
    const data = await res.json();
    const questionList = data.results || [];

    for (const q of questionList) {
      const delRes = await fetch(`${BASE_URL}/questions/${q.id}/`, {
        method: "DELETE",
      });

      if (!delRes.ok) {
        console.error(`질문 삭제 실패: ID=${q.id}`);
      } else {
        console.log(`질문 삭제 성공: ID=${q.id}`);
      }
    }
  } catch (err) {
    throw new Error("전체 질문 삭제 실패: " + err.message);
  }
}
