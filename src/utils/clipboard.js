// ✅ [clipboard.js] 클립보드 복사 유틸 함수

// 📌 1. copyToClipboard(text)
// - navigator.clipboard.writeText(text)를 호출해서 텍스트를 클립보드에 복사함
// - 비동기 함수: async/await 사용
// - try/catch로 예외 처리 (권한 오류, 브라우저 미지원 등)

// 📌 2. 반환값
// - 성공 시 true 반환
// - 실패 시 false 반환 (또는 alert 등 외부 처리)

// 📌 3. 브라우저 호환성
// - clipboard API는 https 환경 또는 localhost에서만 동작함
// - 지원되지 않을 경우 fallback 처리가 필요할 수도 있음 (선택)

// 📌 4. 사용 예시
// const isCopied = await copyToClipboard("https://example.com");
// if (isCopied) setIsCopied(true);
