// ✅ [QuestionCard.jsx] 피드 내 개별 질문 카드 컴포넌트

// 📌 1. props 구성
// - content: 질문 내용
// - createdAt: 질문 생성 시간 (→ formatDate 사용 가능)
// - answer: { content, isRejected, createdAt } 객체 (null일 수도 있음)
// - onLike / onDislike: 좋아요/싫어요 버튼 클릭 핸들러
// - onDelete: 삭제 버튼 클릭 시 호출
// - onEdit: 수정 버튼 클릭 시 호출 (선택)
// - id: 질문 id (API 호출용)

// 📌 2. 상태 기반 분기 처리
// - answer가 null → "미답변"
// - answer.isRejected === true → "답변거절"
// - answer가 있고 isRejected === false → "답변완료"

// 📌 3. UI 구성
// - 질문 내용 + 날짜 표시
// - 답변 상태 (미답변 / 답변완료 / 거절됨) 표시
// - 좋아요/싫어요 버튼 + 카운트 렌더링
// - 우측 케밥 버튼(⋯) 클릭 시 "삭제 / 수정" 노출 (선택)

// 📌 4. 공유 기능 (선택)
// - 링크 아이콘 클릭 시 → 클립보드 복사 + Toast 노출
// - 카카오 / 페이스북 아이콘 클릭 시 → 공유 API 트리거

// 📌 5. 스타일 (Card.module.css)
// - 카드 레이아웃, hover 효과, 버튼 배치
// - 반응형 고려: 질문 내용은 말줄임 처리 or 줄 수 제한

// 📌 6. 접근성 고려 (선택)
// - aria-label, role="button" 등으로 키보드 지원
