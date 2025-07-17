const BASE_URL = "https://openmind-api.vercel.app/17-5";

export async function createSubject({ name }) {
  const response = await fetch(`${BASE_URL}/subjects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error("서버 오류");
  return await response.json();
}

export async function getSubject({ sort = "time", offset = 0, limit = 8 }) {
  const response = await fetch(
    `${BASE_URL}/subjects/?sort=${sort}&offset=${offset}&limit=${limit}`
  );
  if (!response.ok) throw new Error("서버 오류");
  return await response.json();
}
