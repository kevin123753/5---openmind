// ✅ [QuestionModal.jsx] 질문 작성 전용 모달 컴포넌트

// 📌 1. 내부 상태 관리
// - 질문 입력값 상태: useState로 content를 관리
// - 입력값이 없을 경우 "질문 보내기" 버튼은 비활성화

// 📌 2. props 구성
// - onClose: 모달 닫기 핸들러 (Modal.jsx에서 전달됨)
// - onSubmit: 질문 전송 핸들러 (부모에서 API 호출 처리)

// 📌 3. 입력 필드 렌더링
// - placeholder: "질문을 입력하세요"
// - textarea 또는 input 사용 가능
// - 최대 글자 수 제한 (optional)

// 📌 4. 버튼 렌더링
// - "질문 보내기" 버튼: 입력값이 존재할 때만 활성화
// - "X" 버튼 또는 모달 외부 클릭 시 닫기

// 📌 5. 키보드 UX
// - Enter 키 → 전송 트리거 (optional, Shift+Enter는 줄바꿈)

// 📌 6. 전송 후 처리
// - onSubmit 호출 → 성공 시 입력값 초기화 + 모달 닫기

// 📌 7. 스타일
// - QuestionModal 전용 스타일은 Modal.module.css에서 관리
