// src/services/mainService.js

const BASE_URL = "https://openmind-api.vercel.app/17-5";

export async function createSubject(name) {
  const res = await fetch(`${BASE_URL}/subjects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error(`질문 대상 생성 실패: ${res.status}`);
  }

  return await res.json(); // 생성된 subject 객체 리턴
}
