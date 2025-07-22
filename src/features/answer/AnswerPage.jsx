import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { deleteAllQuestionsBySubject } from "../../api/answerApi";

/****** utils ******/
import { setItem } from "../../utils/localStorage";

/****** hook ******/
import usePostUserInfo from "../../hooks/usePostUserInfo";
import useInfiniteScroll from "../../hooks/useInifiniteScroll";

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

  const { id, name, imageSource } = location.state || {};
  const { userId, userName, img } = usePostUserInfo({ id, name, imageSource });

  const { queList, setQueList, refetch, loading, hasNextPage, loadMore } =
    useInfiniteScroll(userId);

  const handleClick = async (questionId) => {
    try {
      const question = queList.find((item) => item.id === questionId);
      if (!question) throw new Error("질문 없음");
      setItem("questionId", question.id);
    } catch (err) {
      console.error("질문 조회 실패", err.message);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !loading) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, loading, loadMore]);

  const handleDeleteAll = async () => {
    if (!window.confirm("모든 질문을 삭제하시겠습니까?")) return;

    try {
      await deleteAllQuestionsBySubject(userId); // 또는 subjectId
      await refetch();
      alert("질문이 모두 삭제되었습니다.");
    } catch (err) {
      console.error("질문 삭제 실패", err);
      alert(err.message || "삭제 중 오류 발생");
    }
  };

  const questionListProps = {
    data: queList,
    img,
    userName,
    dayjs,
    observerRef,
    handleClick,
  };

  return (
    <div className="inner qAPage">
      <ProfileContents img={img} userName={userName} location={location} />
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
