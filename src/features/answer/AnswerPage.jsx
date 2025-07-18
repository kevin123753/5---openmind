import { useEffect, useState } from "react";
import { getQuestionListId } from "../post/postService"; // 경로에 맞게 수정

const QuestionDetail = ({ questionId }) => {
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("questionId:", questionId);

    const fetchData = async () => {
      try {
        const data = await getQuestionListId(questionId);
        console.log("응답 받은 질문:", data);
        setQuestion(data);
      } catch (err) {
        console.error("에러 발생:", err);
        setError(err.message);
      }
    };

    if (questionId) {
      fetchData();
    }
  }, [questionId]);

  if (error) return <div>에러: {error}</div>;
  if (!question) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>질문 상세</h2>
      <p>
        <strong>ID:</strong> {question.id}
      </p>
      <p>
        <strong>내용:</strong> {question.content}
      </p>
      {/* 필요한 데이터 필드에 따라 추가 */}
    </div>
  );
};

export default QuestionDetail;
