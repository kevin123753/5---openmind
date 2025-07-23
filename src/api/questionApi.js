const BASE_URL = "https://openmind-api.vercel.app/17-5";

// 질문 삭제 API
export async function deleteQuestion(questionId) {
  const response = await fetch(`${BASE_URL}/questions/${questionId}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("질문 삭제 실패");
  }
}
