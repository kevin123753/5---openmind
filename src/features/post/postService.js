const BASE_URL = "https://openmind-api.vercel.app/17-5";

export async function createQuestion(subjectId, content) {
  const res = await fetch(`${BASE_URL}/subjects/${subjectId}/questions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("질문 전송 실패");
  return await res.json();
}

export async function getQuestions(subjectId) {
  const res = await fetch(`${BASE_URL}/subjects/${subjectId}/questions/`);
  if (!res.ok) throw new Error("질문 목록 조회 실패");
  return await res.json();
}
