// ✅ [mainService.js] 메인 페이지 전용 로직 모음

// 📌 1. createSubjectAndNavigate(name, navigate)
// - 이름을 인자로 받아 subject 생성 API 호출
// - 생성된 subject의 id로 /post/{id}/answer 경로로 이동
// - 에러 발생 시 alert 또는 예외 핸들링
// - 입력값이 비어있으면 요청 중단

// 🔹 입력:
// - name: 문자열 (사용자 입력값)
// - navigate: useNavigate() 훅으로 전달된 함수

// 🔹 동작:
// - createSubject(name) 호출 → 응답 받은 id 확인
// - navigate(`/post/${id}/answer`) 실행

// 📌 2. validateName(name)
// - 입력값 유효성 검사 함수 (선택)
// - 빈 문자열, 공백만 입력 등 제한
// - 필요 시 특수문자 제한도 가능

// 📌 3. 로딩 처리 (선택)
// - 호출 함수 내부에서 setIsLoading(true/false) 처리 포함할 수도 있음
// - 또는 UI에서 분리해 상태 처리

import { createSubject } from "../../api/subjectApi";
import { setItem } from "../../utils/localStorage";
export async function createSubjectAndNavigate(
  name,
  navigate,
  setError,
  setLoading
) {
  if (!name.trim()) return;

  try {
    setError(null);
    setLoading(true);
    const result = await createSubject({ name });
    setItem("mySubjectId", result.id);
    navigate(`/post/${result.id}/answer`);
  } catch (error) {
    setError(error.message || "잠시 후 다시 시도해 주세요.");
  } finally {
    setLoading(false);
  }
}
