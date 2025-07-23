import { useEffect, useState, useCallback } from "react";
import { getQuestions } from "../api/postApi";

const useQuestionList = (userId) => {
  const [queList, setQueList] = useState([]);

  const fetchQuestions = useCallback(async () => {
    try {
      console.log("🔍 useQuestionList - 질문 목록 요청:", { userId });
      const data = await getQuestions(userId, 10000, 0); // userId는 문자열이어야 함
      console.log("📡 useQuestionList - 응답 데이터:", data);

      if (Array.isArray(data.results)) {
        console.log(
          "✅ useQuestionList - 질문 목록 설정:",
          data.results.length
        );
        setQueList(data.results);
      } else {
        console.error("❌ useQuestionList - 질문 리스트 오류", data);
      }
    } catch (err) {
      console.error("❌ useQuestionList - 질문 에러", err);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchQuestions();
  }, [userId, fetchQuestions]);

  return { queList, setQueList, refetch: fetchQuestions };
};

export default useQuestionList;
