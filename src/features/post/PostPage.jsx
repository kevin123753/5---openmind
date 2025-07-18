import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getQuestions } from "./postService";
import { setItem } from "../../utils/localStorage";

// dayjs 라이브러리
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

// css
import "./QnA.css";
// component
import Button from "../../components/Button/Button";
import Link from "../../components/Icon/LinkIcon";
import Kakao from "../../components/Icon/KakaoIcon";
import Facebook from "../../components/Icon/FacebookIcon";
import MessagesIcon from "../../components/Icon/MessagesIcon";
import QuestionList from "./QuestionList";
import NoQuestion from "./NoQuestion";
import Modal from "../../components/Modal/QuestionModal";

const PostPage = () => {
  const location = useLocation();

  // listPage에서 현재 상태 받아옴
  const { id, name, imageSource } = location.state || {};
  // 현재상태 저장
  const [userName, setUserName] = useState(name || "");
  const [userId, setUserId] = useState(id || "");
  const [img, setImg] = useState(imageSource || "");

  // 모달창 상태
  const [modal, setModal] = useState(false);

  // 질문 저장
  const [queList, setQueList] = useState([]);

  useEffect(() => {
    if (!userId) {
      const storedName = localStorage.getItem("name");
      const storedId = localStorage.getItem("mySubjectId");
      const storedImg = localStorage.getItem("imageSource");

      if (storedId) {
        setUserName(storedName || "");
        setUserId(storedId);
        setImg(storedImg || "");
      }
    }
  }, []);

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

  // 질문 클릭했을때 해당 아이디 questionId라는 이름으로 저장!
  const handleClick = async (questionId) => {
    try {
      const question = queList.find((item) => item.id === questionId);
      if (!question) throw new Error("질문 없음");

      setItem("questionId", question.id);
      console.log("questionId 저장됨");
    } catch (err) {
      console.error("질문 조회 실패", err.message);
    }
  };

  return (
    <div className="inner qAPage">
      <div className="profileContents">
        <img src={img} alt="큰 프로필" />
        <h2>{userName}</h2>
        <div className="BtnContents">
          <Button
            variant="round"
            size="xsmall"
            className="styleLink"
            leftIcon={<Link />}
          />
          <Button
            variant="round"
            size="xsmall"
            className="styleKakao"
            leftIcon={<Kakao />}
          />
          <Button
            variant="round"
            size="xsmall"
            className="styleFacebook"
            leftIcon={<Facebook />}
          />
        </div>
      </div>
      <div className="container">
        <h3>
          <MessagesIcon />
          {queList.length
            ? `${queList.length}개의 질문이 있습니다`
            : `아직 질문이 없습니다`}
        </h3>
        {queList.length ? (
          // <<<<<<< HEAD
          //           <QuestionList
          //             data={queList}
          //             img={img}
          //             userName={userName}
          //             dayjs={dayjs}
          //           />
          // =======
          <QuestionList
            data={queList}
            img={img}
            userName={userName}
            dayjs={dayjs}
            handleClick={handleClick}
          />
        ) : (
          // >>>>>>> origin/feature/한유선/post-page
          <NoQuestion />
        )}
      </div>
      <Button
        variant="round"
        size="large"
        className="shadow-2 queBtn"
        onClick={() => setModal(!modal)}
      >
        질문 작성하기
      </Button>
      {modal && (
        <Modal
          setModal={setModal}
          id={userId}
          queList={queList}
          setQueList={setQueList}
          img={img}
          userName={userName}
        />
      )}
    </div>
  );
};

export default PostPage;
