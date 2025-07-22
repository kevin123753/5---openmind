import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

/****** utils ******/
import { setItem } from "../../utils/localStorage";

/****** hook ******/
import useResponsiveSize from "../../hooks/useResponsiveSize";
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
// 공통 컴포넌트
import MessagesIcon from "../../components/Icon/MessagesIcon";
import Button from "../../components/Button/Button";

// 페이지 컴포넌트
import ProfileContents from "./component/ProfileContents";
import QuestionList from "./component/QuestionList";
import NoQuestion from "./component/NoQuestion";
import Modal from "./component/QuestionModal";

const PostPage = () => {
  const observerRef = useRef(null);
  const location = useLocation();

  const size = useResponsiveSize();

  // 모달창 상태
  const [modal, setModal] = useState(false);

  // listPage에서 현재 상태 받아옴
  const { id, name, imageSource } = location.state || {};

  // hook에서 변수 받아옴
  const { userId, userName, img } = usePostUserInfo({ id, name, imageSource });
  const { queList, loading, hasNextPage, loadMore, setQueList, totalCount } = useInfiniteScroll(userId);

  // 질문 클릭했을때 해당 아이디 questionId라는 이름으로 저장!
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

  /****** props ******/
  const questionListProps = {
    data: queList,
    img,
    userName,
    dayjs,
    observerRef,
    handleClick,
  };

  const modalProps = {
    id: userId,
    img,
    userName,
    queList,
    setModal,
    setQueList,
  };
  return (
    <div className="inner qAPage">
      <ProfileContents img={img} userName={userName} location={location} />
      <div className="container">
        <h3>
          <MessagesIcon />
          {totalCount ? `${totalCount}개의 질문이 있습니다` : `아직 질문이 없습니다`}
        </h3>
        {totalCount ? <QuestionList {...questionListProps} /> : <NoQuestion />}
      </div>
      <Button variant="round" size="large" className="shadow-2 queBtn" onClick={() => setModal(!modal)}>
        {size !== "small" ? "질문 작성하기" : "질문 작성"}
      </Button>
      {modal && <Modal {...modalProps} />}
    </div>
  );
};

export default PostPage;
