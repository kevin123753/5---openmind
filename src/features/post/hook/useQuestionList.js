import { useEffect, useState } from "react";
import { getQuestions } from "../postService";

const useQuestionList = (userId) => {
  // 질문 저장
  const [queList, setQueList] = useState([]);
  // 질문 목록 불러오기
  useEffect(() => {
    if (!userId) return;

    const fetchQuestions = async () => {
      try {
        const data = await getQuestions(userId);
        console.log(data);
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
