import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { deleteAllQuestionsBySubject } from "../../api/answerApi";

/****** utils ******/
import { setItem, getItem } from "../../utils/localStorage";

/****** hook ******/
import useQuestionList from "../../hooks/useQuestionList";

/****** dayjs 라이브러리 ******/
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

/****** css ******/
import "../../style/QnA.css";

/****** component ******/
import MessagesIcon from "../../components/Icon/MessagesIcon";
import Button from "../../components/Button/Button";
import ProfileContents from "./component/ProfileContents";
import QuestionList from "./component/QuestionList";
import NoQuestion from "./component/NoQuestion";

const AnswerPage = () => {
  const observerRef = useRef(null);
  const location = useLocation();

  // 메인에서 전달된 상태 or localStorage에서 subject 정보 가져오기
  const { id, name, imageSource } = location.state || {};
  const subjectId = id || getItem("mySubjectId");
  const username = name || getItem("username");
  const userImage = imageSource || getItem("userImage");

  // 전달된 정보 localStorage 저장
  useEffect(() => {
    if (id && name) {
      setItem("mySubjectId", id);
      setItem("username", name);
      setItem("userImage", imageSource);
    }
  }, [id, name, imageSource]);

  // 리스트 받아옴
  const { queList, setQueList } = useQuestionList(subjectId);
  if (!subjectId) {
    return null;
  }
  const handleClick = async (questionId) => {
    try {
      const question = queList.find((item) => item.id === questionId);
      if (!question) throw new Error("질문 없음");
      setItem("questionId", question.id);
    } catch (err) {
      console.error("질문 조회 실패", err.message);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("모든 질문을 삭제하시겠습니까?")) return;

    try {
      console.log("삭제 대상 subjectId:", subjectId);
      await deleteAllQuestionsBySubject(subjectId);
      setQueList([]); // 🔄 질문 리스트 초기화
      window.scrollTo(0, 0); // 🔄 스크롤 최상단 이동으로 옵저버 재발동 유도
      alert("질문이 모두 삭제되었습니다.");
    } catch (err) {
      console.error("질문 삭제 실패", err);
      alert(err.message || "삭제 중 오류 발생");
    }
  };

  const questionListProps = {
    data: queList,
    dayjs,
    observerRef,
    handleClick,
  };

  return (
    <div className="inner qAPage">
      <ProfileContents img={userImage} userName={username} location={location} />
      <div className="answerBtnContents">
        <Button variant="round" size="small" className="shadow-2 removeBtn" onClick={handleDeleteAll}>
          삭제하기
        </Button>
      </div>
      <div className="container">
        <h3>
          <MessagesIcon />
          {queList.length > 0 ? `${queList.length}개의 질문이 있습니다` : "아직 질문이 없습니다"}
        </h3>
        {queList.length > 0 ? <QuestionList {...questionListProps} /> : <NoQuestion />}
      </div>
    </div>
  );
};

export default AnswerPage;
