// ✅ [ShareButtons.jsx] 링크 공유용 버튼 묶음 컴포넌트

// 📌 1. props 구성
// - shareUrl: 공유할 대상 URL (예: `https://openmind.com/post/12`)
// - onCopy: URL 복사 시 실행할 콜백 (예: Toast 노출용 setIsCopied(true))

// 📌 2. 구성 버튼
// - 복사 버튼: navigator.clipboard.writeText(shareUrl) 실행
// - 카카오 버튼: window.Kakao.Share.sendDefault() 호출 (SDK 설정 필요)
// - 페이스북 버튼: 새 창 열기 (window.open) → https://www.facebook.com/sharer/sharer.php?u=shareUrl

// 📌 3. 스타일링 (ShareButtons.module.css)
// - 버튼은 인라인 정렬 or flex
// - 아이콘 or 이미지 기반 스타일 (크기 24~32px)
// - hover 시 커서 pointer, 색상 강조

// 📌 4. 접근성 고려 (선택)
// - 각 버튼에 aria-label 부여 (예: aria-label="링크 복사")

// 📌 5. 사용 예시
// <ShareButtons shareUrl={`https://...`} onCopy={() => setIsCopied(true)} />
