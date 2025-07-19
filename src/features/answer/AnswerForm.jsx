import { useEffect, useState } from "react";
import { postAnswer, putAnswer } from "../../api/answerApi";
// import styles from "./AnswerForm.module.css";
export default function AnswerForm({
  question,
  subject,
  isEditing,
  initialContent,
  onSuccess,
  onCancel,
}) {
  const [content, setContent] = useState(initialContent || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      let result;

      if (isEditing) {
        result = await putAnswer(question.answer.id, { content });
      } else {
        result = await postAnswer(question.id, {
          content,
          isRejected: false,
        });
      }

      onSuccess({ ...result, questionId: question.id });
    } catch (error) {
      setError(error.message || "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 답변 완료 상태이면서 수정 중이 아닐 때는 내용만 출력
  if (question.answer && !isEditing) {
    return <p className="answer-content">{question.answer.content}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles["answer-form"]}>
      <label className={styles["form-label"]}>
        <img
          src={subject.imageSource}
          alt="프로필"
          className={styles["form-profile-image"]}
        />
        {subject.name}
      </label>

      <textarea
        value={content}
        onChange={handleChange}
        placeholder="답변을 입력해주세요"
        className={styles["form-textarea"]}
      />

      <div className={styles["form-footer"]}>
        <button
          type="submit"
          disabled={isLoading || !content.trim()}
          className={styles["submit-button"]}
        >
          {isEditing ? "수정 완료" : "답변 완료"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className={styles["cancel-button"]}
          >
            취소
          </button>
        )}
      </div>

      {error && <p className={styles["error-text"]}>{error}</p>}
    </form>
  );
}
