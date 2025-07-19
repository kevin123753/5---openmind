import { useState } from "react";
import { useLocation } from "react-router-dom";
import { setItem } from "../../utils/localStorage";

// hook
import useCopyUrlToast from "./hook/useCopyUrlToast";
import usePostUserInfo from "./hook/usePostUserInfo";
import useQuestionList from "./hook/useQuestionList";

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
import QuestionList from "./component/QuestionList";
import NoQuestion from "./component/NoQuestion";
import Modal from "./component/QuestionModal";
import Toast from "../../components/Toast/Toast";

const PostPage = () => {
  const location = useLocation();

  // 모달창 상태
  const [modal, setModal] = useState(false);

  // listPage에서 현재 상태 받아옴
  const { id, name, imageSource } = location.state || {};

  const { userId, userName, img } = usePostUserInfo({ id, name, imageSource });
  const { toast, copyUrl } = useCopyUrlToast();
  const { queList, setQueList } = useQuestionList(userId);

  //  링크 복사
  const handleUrlCopy = () => {
    const url = window.location.origin + location.pathname;
    copyUrl(url);
  };
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
          <Button variant="round" size="xsmall" className="styleLink" leftIcon={<Link />} onClick={handleUrlCopy} />
          <Button variant="round" size="xsmall" className="styleKakao" leftIcon={<Kakao />} />
          <Button variant="round" size="xsmall" className="styleFacebook" leftIcon={<Facebook />} />
        </div>
        {toast && <Toast />}
      </div>
      <div className="container">
        <h3>
          <MessagesIcon />
          {queList.length ? `${queList.length}개의 질문이 있습니다` : `아직 질문이 없습니다`}
        </h3>
        {queList.length ? (
          <QuestionList data={queList} img={img} userName={userName} dayjs={dayjs} handleClick={handleClick} />
        ) : (
          <NoQuestion />
        )}
      </div>
      <Button variant="round" size="large" className="shadow-2 queBtn" onClick={() => setModal(!modal)}>
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
