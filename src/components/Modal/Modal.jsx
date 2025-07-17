// ✅ [Modal.jsx] 공통 모달 Wrapper 컴포넌트

// 📌 1. props 구성
// - children: 모달 내부에 들어갈 실제 콘텐츠 (모달 내용)
// - onClose: 모달 닫기 핸들러 함수
// - isOpen: 모달 열림 여부 (true/false)
// - [선택] 모달 애니메이션을 위해 transition 클래스 추가 가능

// 📌 2. Portal 렌더링
// - 모달은 일반 DOM 트리에서 벗어나 body 하단에 렌더링돼야 함
// - ReactDOM.createPortal 사용

// 📌 3. 외부 영역 클릭 시 모달 닫기 처리
// - 배경(overlay) 클릭 → onClose 호출
// - 모달 내부를 클릭할 경우 이벤트 전파(stopPropagation)로 닫히지 않게 함

// 📌 4. Esc 키 누르면 모달 닫힘 (선택)
// - useEffect로 keydown 이벤트 등록 및 해제
// - 키코드 27 또는 key === 'Escape' 감지

// 📌 5. 모달 열릴 때 body 스크롤 막기
// - useEffect로 isOpen 상태에 따라 document.body.style.overflow = 'hidden' 설정
// - 닫힐 때 원상복구

// 📌 6. 모달 스타일 구성
// - 배경: 반투명 검정 (#000000aa 등)
// - 중앙 정렬된 박스
// - z-index: 999 이상

// 📌 7. 사용 예시
// <Modal isOpen={isModalOpen} onClose={handleClose}>
//   <QuestionModal />
// </Modal>
