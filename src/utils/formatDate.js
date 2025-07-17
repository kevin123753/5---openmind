// ✅ [formatDate.js] 날짜 포맷 유틸 함수

// 📌 1. formatDate(isoString)
// - ISO 형식의 문자열(예: "2023-11-01T00:55:23.859Z")을 받아
//   "YYYY.MM.DD" 형태로 포맷팅해서 반환
// - 예: "2023.11.01"

// 📌 2. formatRelativeTime(isoString)
// - 현재 시간과 비교해 "방금 전", "3분 전", "2시간 전", "3일 전" 등 상대 시간 반환
// - Date 객체로 변환 후 밀리초 단위 차이 계산
// - 분/시간/일/주/달 기준으로 나눠 표시

// 📌 3. 사용 예시
/*
formatDate("2023-07-10T14:23:00Z");          // → "2023.07.10"
formatRelativeTime("2023-07-10T14:23:00Z");  // → "2시간 전"
*/

// 📌 4. 참고: Intl.DateTimeFormat API 또는 dayjs/date-fns 라이브러리로도 대체 가능
// - 단, 현재는 순수 JavaScript 방식으로 처리
