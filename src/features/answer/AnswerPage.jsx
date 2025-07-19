import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuestions } from "../post/postService";
import { putAnswer } from "../../api/answerApi";
import AnswerForm from "./AnswerForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
// import styles from "./AnswerPage.module.css";
import Button from "../../components/Button/Button";
import Link from "../../components/Icon/LinkIcon";
import Kakao from "../../components/Icon/KakaoIcon";
import Facebook from "../../components/Icon/FacebookIcon";
import MessagesIcon from "../../components/Icon/MessagesIcon";
import NoQuestion from "../post/component/NoQuestion";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const AnswerPage = () => {
  const { id: subjectId } = useParams();
  const location = useLocation();
  const [subject, setSubject] = useState({ name: "", imageSource: "" });
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingAnswerId, setEditingAnswerId] = useState(null);

  const handleDeleteAll = async () => {
    if (!window.confirm("모든 질문을 삭제하시겠습니까?")) return;

    try {
      await deleteAllQuestionsBySubject(subjectId);
      alert("질문이 모두 삭제되었습니다.");
      handleQuestionLoad();
    } catch (err) {
      alert(err.message || "삭제 중 오류 발생");
    }
  };

  const handleQuestionLoad = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getQuestions(subjectId);
      const validQuestions = data.results || [];
      setQuestions(validQuestions);
    } catch (error) {
      setError(error.message || "질문을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (answer) => {
    setEditingAnswerId(answer.id);
  };

  const handleReject = async (answerId) => {
    if (!window.confirm("정말 답변을 거절하시겠습니까?")) return;
    try {
      const updatedQuestions = [...questions];
      const index = updatedQuestions.findIndex((q) => q.answer?.id === answerId);
      if (index === -1) return;

      const updatedAnswer = {
        ...updatedQuestions[index].answer,
        content: "답변 거절",
        isRejected: true,
      };

      await putAnswer(answerId, updatedAnswer);

      updatedQuestions[index] = {
        ...updatedQuestions[index],
        answer: updatedAnswer,
      };

      setQuestions(updatedQuestions);
    } catch (error) {
      alert("거절 실패: " + error.message);
    }
  };

  const handleUpdateSuccess = (updatedAnswer) => {
    const index = questions.findIndex((q) => q.answer?.id === updatedAnswer.id);
    if (index !== -1) {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        answer: updatedAnswer,
      };
      setQuestions(updatedQuestions);
    }
    setEditingAnswerId(null);
  };

  useEffect(() => {
    if (!subjectId) return;
    handleQuestionLoad();
  }, [subjectId]);

  useEffect(() => {
    if (location.state) {
      const { name, imageSource } = location.state;
      setSubject({ name, imageSource });
      localStorage.setItem("name", name);
      localStorage.setItem("imageSource", imageSource);
    } else {
      setSubject({
        name: localStorage.getItem("name") || "",
        imageSource: localStorage.getItem("imageSource") || "",
      });
    }
  }, []);

  return (
    <div className={styles["answer-page"]}>
      <div className={styles["profile-section"]}>
        <img src={subject.imageSource} alt="프로필 이미지" className={styles["profile-image"]} />
        <h2 className={styles["profile-name"]}>{subject.name}</h2>

        <div className={styles["share-buttons"]}>
          <Button variant="round" size="xsmall" className={styles["link-button"]} leftIcon={<Link />} />
          <Button variant="round" size="xsmall" className={styles["kakao-button"]} leftIcon={<Kakao />} />
          <Button variant="round" size="xsmall" className={styles["facebook-button"]} leftIcon={<Facebook />} />
        </div>
      </div>

      <Button variant="default" size="small" onClick={handleDeleteAll} className={styles["delete-button"]}>
        삭제 하기
      </Button>

      <div className={styles["question-section"]}>
        <h3 className={styles["question-count"]}>
          <MessagesIcon />
          {questions.length ? `${questions.length}개의 질문이 있습니다` : `아직 질문이 없습니다`}
        </h3>

        <div className={styles["question-list"]}>
          {isLoading ? (
            <p className={styles["loading-text"]}>로딩 중...</p>
          ) : questions.length === 0 ? (
            <NoQuestion />
          ) : (
            questions.map((question) => {
              const answer = question.answer;
              if (answer?.isRejected) return null;

              const isEditing = editingAnswerId === answer?.id;

              return (
                <div key={question.id} className={styles["question-card"]}>
                  <div className={styles["question-meta"]}>
                    <div className={`${styles["badge"]} ${answer ? styles["answered"] : styles["unanswered"]}`}>
                      {answer ? "답변완료" : "미답변"}
                    </div>

                    <button onClick={() => toggleMenu(question.id)} className={styles["menu-button"]}>
                      ⋮
                    </button>

                    {openMenuId === question.id && (
                      <ul className={styles["dropdown-menu"]}>
                        {answer && (
                          <>
                            <li className={styles["dropdown-item"]} onClick={() => handleEdit(answer)}>
                              수정하기
                            </li>
                            <li className={styles["dropdown-item"]} onClick={() => handleReject(answer.id)}>
                              답변 거절
                            </li>
                          </>
                        )}
                      </ul>
                    )}

                    <span className={styles["timestamp"]}>질문 · {dayjs(question.createdAt).fromNow()}</span>
                  </div>

                  <p className={styles["question-content"]}>{question.content}</p>

                  <AnswerForm
                    question={question}
                    subject={subject}
                    isEditing={isEditing}
                    initialContent={answer?.content || ""}
                    onSuccess={handleUpdateSuccess}
                    onCancel={() => setEditingAnswerId(null)}
                  />

                  <div className={styles["reaction"]}>
                    👍좋아요 {question.like} 👎싫어요 {question.dislike}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerPage;
