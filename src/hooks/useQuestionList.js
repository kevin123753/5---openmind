import { useEffect, useState } from "react";
import { getQuestions } from "../features/post/postService";

const useQuestionList = (userId) => {
  const [queList, setQueList] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchQuestions = async () => {
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
    };

    fetchQuestions();
  }, [userId]);

  return { queList, setQueList };
};

export default useQuestionList;
