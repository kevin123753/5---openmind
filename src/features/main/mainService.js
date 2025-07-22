import { createSubject } from "../../api/subjectApi";
import { setItem } from "../../utils/localStorage";
import { getItem } from "../../utils/localStorage";
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

    // ✅ 이름 기반 subject 생성 요청
    const result = await createSubject({ name });

    // ✅ 응답 유효성 검사
    if (!result?.id || !result?.name || !result?.imageSource) {
      throw new Error("유효하지 않은 subject 응답입니다.");
    }

    // ✅ 디버깅 로그 (개발 단계에서 매우 중요)
    console.log("✅ 생성된 subject 응답:", result);

    // ✅ localStorage에 안전하게 저장
    setItem("mySubjectId", result.id);
    localStorage.setItem("userCreated", "true"); // 🆕 필요시 유지하되 의미 명확히
    console.log("🔍 저장 확인:", getItem("mySubjectId"));
    // ✅ AnswerPage로 이동 (state도 정확히 전달)
    navigate(`/post/${result.id}/answer`, {
      state: {
        id: result.id,
        name: result.name,
        imageSource: result.imageSource,
      },
    });
  } catch (error) {
    // ✅ 오류 발생 시 콘솔 로그 + 사용자 메시지
    console.error("❌ subject 생성 또는 이동 실패:", error);
    setError(error.message || "잠시 후 다시 시도해 주세요.");
  } finally {
    setLoading(false);
  }
}
