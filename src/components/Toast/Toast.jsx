// ✅ [Toast.jsx] 잠깐 노출되는 메시지용 토스트 컴포넌트

// 📌 1. props 구성
// - message: 표시할 텍스트 (예: "URL이 복사되었습니다")
// - duration: 표시 시간 (기본값 5000ms, 선택)
// - isVisible: 외부에서 토스트가 보여야 할지 여부
// - onClose: duration이 지나면 호출될 콜백 (토스트 제거용)

// 📌 2. useEffect로 자동 제거 처리
// - isVisible이 true가 되면 setTimeout으로 duration 후 onClose 호출
// - 컴포넌트 unmount 시 clearTimeout 필요

// 📌 3. 스타일 구조 (Toast.module.css)
// - 위치: 화면 오른쪽 하단 or 중앙 하단
// - 배경색: 어두운 회색 or 반투명 검정
// - 텍스트: 흰색, 굵기
// - border-radius, padding 등 포함
// - opacity fade-in/out 애니메이션

// 📌 4. 애니메이션 (선택)
// - fade-in / fade-out 클래스 분리 or transition 처리
// - 초기 mount 시 투명 → 서서히 보이기 → 사라짐

// 📌 5. 사용 예시
// {isCopied && <Toast message="URL이 복사되었습니다" onClose={() => setIsCopied(false)} />}
