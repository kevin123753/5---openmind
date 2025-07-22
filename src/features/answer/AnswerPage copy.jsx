// React 및 라우터
import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// API
import { putAnswer, deleteAllQuestionsBySubject } from "../../api/answerApi";
import { getSubjectById } from "../../api/subjectApi";

// 훅
import useInfiniteScroll from "../post/hook/useInifiniteScroll";

// 컴포넌트
import ProfileContents from "../post/component/ProfileContents";
import NoQuestion from "../post/component/NoQuestion";
import QuestionList from "../post/component/QuestionList";

// 스타일
import "./AnswerPage.css";

// 아이콘
import MessagesIcon from "../../components/Icon/MessagesIcon";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

// dayjs 설정
dayjs.extend(relativeTime);
dayjs.locale("ko");

const AnswerPage = () => {
  const { id: subjectId } = useParams(); // 주소로부터 subjectId 확보
  const location = useLocation();
  const navigate = useNavigate();

  // 상태 관리
  const [subject, setSubject] = useState({ name: "", imageSource: "" });
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  // 무한스크롤 훅
  const {
    queList: questions,
    setQueList: setQuestions,
    loading: isLoading,
    loadMore,
  } = useInfiniteScroll(subjectId);

  // 답변 취소 함수
  const handleCancelEdit = () => {
    setEditingAnswerId(null); // 편집 모드 종료
  };

  // subject 정보 가져오기 (주소로부터 또는 API 호출)
  useEffect(() => {
    const state = location.state;

    // 상태로 전달된 경우 (navigate() 통해 접근)
    if (state?.name && state?.imageSource) {
      setSubject({ name: state.name, imageSource: state.imageSource });
      localStorage.setItem("name", state.name);
      localStorage.setItem("imageSource", state.imageSource);
    } else {
      // 직접 접근 또는 새로고침 시 fallback API 호출
      getSubjectById(subjectId)
        .then((res) => {
          setSubject({ name: res.name, imageSource: res.imageSource });
          localStorage.setItem("name", res.name);
          localStorage.setItem("imageSource", res.imageSource);
        })
        .catch((err) => {
          console.error("API 실패: ", err);
          alert("잘못된 접근입니다.");
          navigate("/"); // 잘못된 접근 시 홈으로 리디렉션
        });
    }
  }, [subjectId, location.state, navigate]);

  // 질문 삭제 함수
  const handleDeleteAll = async () => {
    if (!window.confirm("모든 질문을 삭제하시겠습니까?")) return;

    try {
      await deleteAllQuestionsBySubject(subjectId);
      alert("질문이 모두 삭제되었습니다.");
      setQuestions([]); // 질문 리스트 초기화
    } catch (err) {
      console.error("질문 삭제 실패", err);
      alert(err.message || "삭제 중 오류 발생");
    }
  };

  // 메뉴 토글 함수
  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id)); // 현재 메뉴가 열려 있으면 닫고, 아니면 열기
  };

  // 답변 수정 시작 함수
  const handleEdit = (answer) => {
    setEditingAnswerId(answer.id);
  };

  // 답변 거절 함수
  const handleReject = async (answerId) => {
    if (!window.confirm("정말 답변을 거절하시겠습니까?")) return;

    try {
      const index = questions.findIndex((q) => q.answer?.id === answerId);
      if (index === -1) return; // 해당 답변이 없으면 종료

      const updatedAnswer = {
        ...questions[index].answer,
        content: "답변 거절",
        isRejected: true,
      };
      await putAnswer(answerId, updatedAnswer);

      const newQuestions = [...questions];
      newQuestions[index] = { ...newQuestions[index], answer: updatedAnswer };
      setQuestions(newQuestions); // 질문 리스트 업데이트
    } catch (error) {
      console.error("답변 거절 실패", error);
      alert("거절 실패: " + (error.message || "알 수 없는 오류"));
    }
  };

  // 무한스크롤 옵저버 설정
  const observerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore(); // 페이지 끝에 도달하면 추가 로드
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // 정리
    };
  }, [loadMore]);
  useEffect(() => {
    setQuestions([
      {
        id: 1,
        content: "질문입니다.",
        createdAt: "2025-07-22",
        answer: {
          id: 10,
          content: "답변 내용입니다.",
          isRejected: false,
        },
      },
      {
        id: 2,
        content: "두 번째 질문입니다.",
        createdAt: "2025-07-20",
        answer: null,
      },
      {
        id: 1,
        content: "질문입니다.",
        createdAt: "2025-07-22",
        answer: {
          id: 6,
          content: "답변 내용입니다.",
          isRejected: false,
        },
      },
      {
        id: 18,
        content: "두 번째 질문입니다.",
        createdAt: "2025-07-20",
        answer: null,
      },
    ]);
  }, []);

  return (
    <div className="qAPage">
      <ProfileContents
        img={subject.imageSource}
        userName={subject.name}
        location={location}
      />

      <div className="container">
        <h3 className="questionCount">
          <MessagesIcon />
          {Array.isArray(questions) && questions.length > 0
            ? `${questions.length}개의 질문이 있습니다`
            : "아직 질문이 없습니다"}
        </h3>

        <div className="list-content">
          {/* ✅ QuestionList 컴포넌트로 교체 */}
          <QuestionList
            data={questions.filter((q) => !q.answer?.isRejected)} // ✅ 거절 제외
            img={subject.imageSource}
            userName={subject.name}
            dayjs={dayjs}
            observerRef={observerRef}
            isAnswerPage={true} // ✅ AnswerPage용 플래그
            editable={true} // ✅ 케밥 메뉴 표시
            editingAnswerId={editingAnswerId}
            onEdit={handleEdit}
            onCancelEdit={handleCancelEdit}
            subject={subject}
            openMenuId={openMenuId}
            toggleMenu={toggleMenu}
            handleReject={handleReject}
          />
        </div>

        {isLoading && <p className="loadingText">로딩 중...</p>}
        {!questions.length && !isLoading && <NoQuestion />}
      </div>
    </div>
  );
};

export default AnswerPage;
