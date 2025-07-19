const BASE_URL = "https://openmind-api.vercel.app/17-5";

export async function postAnswer(questionId, { content, isRejected }) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/answers/`, {
    method: "POST",
    body: JSON.stringify({ content, isRejected }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("답변 등록 실패");
  return res.json();
}
export async function deleteAnswer(answerId) {
  const res = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("답변 삭제 실패");
  return;
}

export async function putAnswer(answerId, { content, isRejected }) {
  const res = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: "PUT",
    body: JSON.stringify({ content, isRejected }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("답변 수정 실패");
  return res.json();
}
export async function deleteAllQuestionsBySubject(subjectId) {
  try {
    const res = await fetch(`${BASE_URL}/subjects/${subjectId}/questions`);
    const data = await res.json();
    const questionList = data.results || [];

    for (const q of questionList) {
      await fetch(`${BASE_URL}/questions/${q.id}/`, {
        method: "DELETE",
      });
    }
  } catch (err) {
    throw new Error("전체 질문 삭제 실패: " + err.message);
  }
}
