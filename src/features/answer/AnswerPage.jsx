import { useRef, useEffect, useState } from "react"; //✅케밥메뉴를 위한 state추가
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
  const [editingAnswerId, setEditingAnswerId] = useState(null); // ✅수정 중인 답변 ID
  const [openMenuId, setOpenMenuId] = useState(null); // ✅열린 케밥 메뉴 대상

  // 메인에서 전달된 상태 or localStorage에서 subject 정보 가져오기
  const { id, name, imageSource } = location.state || {};
  const subjectId = id || getItem("mySubjectId");
  const username = name || getItem("username");
  const userImage = imageSource || getItem("userImage");

  //✅케밥 메뉴를 위한 추가
  const toggleMenu = (questionId) => {
    setOpenMenuId((prev) => (prev === questionId ? null : questionId));
  };
  const onEdit = (answer) => {
    setEditingAnswerId(answer.id);
    setOpenMenuId(null);
  };
  const onCancelEdit = () => {
    setEditingAnswerId(null);
  };
  const handleReject = async (answerId) => {
    try {
      await putAnswer(answerId, { isRejected: true }); // API에 따라 다름
      await refetch();
    } catch (err) {
      alert("답변 거절 실패");
    }
  };
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); //메뉴 바깥 클릭 시 닫히는 기능
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
    isAnswerPage: true, // ✅ 답변페이지임을 명시
    editable: true, // ✅ 케밥 메뉴 렌더링 활성화
    editingAnswerId, //✅현재 수정 중인 답변의 ID
    openMenuId, //✅현재 열린 드롭다운의 질문 ID
    onEdit, //✅수정 버튼 클릭 처리
    onCancelEdit, //	✅수정 취소 시 호출
    handleReject, //✅	답변 거절 처리
    toggleMenu, //	✅현재 메뉴 열기/닫기
    subject: { id, name, imageSource }, // ✅AnswerForm용
    onAnswerSuccess: async () => {
      await refetch();
      setEditingAnswerId(null);
    }, //	✅답변 등록/수정 완료 시 콜백
  };

  return (
    <div className="inner qAPage">
      <ProfileContents
        img={userImage}
        userName={username}
        location={location}
      />
      <div className="answerBtnContents">
        <Button
          variant="round"
          size="small"
          className="shadow-2 removeBtn"
          onClick={handleDeleteAll}
        >
          삭제하기
        </Button>
      </div>
      <div className="container">
        <h3>
          <MessagesIcon />
          {queList.length > 0
            ? `${queList.length}개의 질문이 있습니다`
            : "아직 질문이 없습니다"}
        </h3>
        {queList.length > 0 ? (
          <QuestionList {...questionListProps} />
        ) : (
          <NoQuestion />
        )}
      </div>
    </div>
  );
};

export default AnswerPage;
