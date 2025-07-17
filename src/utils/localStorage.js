// ✅ [localStorage.js] localStorage 접근 유틸 함수 모음

// 📌 1. setItem(key, value)
// - 로컬 스토리지에 key-value 형태로 저장
// - value는 JSON.stringify로 직렬화 후 저장 (객체도 처리 가능)

// 📌 2. getItem(key)
// - 로컬 스토리지에서 key에 해당하는 값을 가져옴
// - JSON.parse로 역직렬화
// - 없거나 파싱 실패 시 null 반환

// 📌 3. removeItem(key)
// - 로컬 스토리지에서 key에 해당하는 항목 삭제

// 📌 4. clearAll (선택)
// - localStorage 전체를 비움 (로그아웃 또는 초기화용)

// 📌 5. 사용 예시
/*
setItem('subjectId', 17);
const id = getItem('subjectId');
removeItem('subjectId');
*/

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getItem(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}
export function removeItem(key) {
  localStorage.removeItem(key);
}
