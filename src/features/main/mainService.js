import { createSubject } from "../../api/subjectApi";
import { setItem } from "../../utils/localStorage";
export async function createSubjectAndNavigate(name, navigate, setError, setLoading) {
  if (!name.trim()) return;

  try {
    setError(null);
    setLoading(true);
    const result = await createSubject({ name });
    setItem("mySubjectId", result.id);
    navigate(`/post/${result.id}/answer`, {
      state: {
        id: result.id,
        name: result.name,
        imageSource: result.imageSource,
      },
    });
  } catch (error) {
    setError(error.message || "잠시 후 다시 시도해 주세요.");
  } finally {
    setLoading(false);
  }
}
