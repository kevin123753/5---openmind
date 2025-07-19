const BASE_URL = "https://openmind-api.vercel.app/17-5";

// POST   /subjects/{subjectId}/questions/
export async function createQuestion(subjectId, content) {
  const res = await fetch(`${BASE_URL}/subjects/${subjectId}/questions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("질문 생성 실패");
  return await res.json();
}

// GET    /subjects/{subjectId}/questions/
export async function getQuestions(subjectId, limit = 8, offset = 0) {
  const res = await fetch(`${BASE_URL}/subjects/${subjectId}/questions/?limit=${limit}&offset=${offset}`);

  if (!res.ok) throw new Error("질문 목록 조회 실패");
  return await res.json();
}

// GET    /questions/{questionId}/
export async function getQuestionListId(questionId) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}`);

  if (!res.ok) throw new Error("질문 조회");
  return await res.json();
}

// DELETE /questions/{questionId}/
export async function deleteQuestion(questionId) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("질문 삭제 실패");
}

// POST /questions/{questionId}/reaction/
export async function postReaction(questionId, reaction) {
  const res = await fetch(`${BASE_URL}/questions/${questionId}/reaction/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: reaction }),
  });

  if (!res.ok) throw new Error("리액션 실패");

  return await res.json();
}
