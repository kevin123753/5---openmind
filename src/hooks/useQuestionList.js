import { useEffect, useState, useCallback } from "react";
import { getQuestions } from "../features/post/postService";

const useQuestionList = (userId) => {
  const [queList, setQueList] = useState([]);

  const fetchQuestions = useCallback(async () => {
    try {
      const data = await getQuestions(userId, 10000, 0); // userId는 문자열이어야 함
      if (Array.isArray(data.results)) {
        setQueList(data.results);
      } else {
        console.error("질문 리스트 오류", data);
      }
    } catch (err) {
      console.error("질문 에러", err);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchQuestions();
  }, [userId, fetchQuestions]);

  return { queList, setQueList, refetch: fetchQuestions };
};

export default useQuestionList;
