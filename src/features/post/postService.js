export async function createQuestion(subjectId, content) {
  const res = await fetch(`https://openmind-api.vercel.app/17-5/subjects/${subjectId}/questions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("질문 전송 실패");

  return await res.json();
}
