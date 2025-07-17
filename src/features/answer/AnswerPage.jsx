import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getQuestions } from "../post/postService";

// dayjs 라이브러리
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

// css
import "../post/QnA.css";
// component
import Button from "../../components/Button/Button";
import Link from "../../components/Icon/LinkIcon";
import Kakao from "../../components/Icon/KakaoIcon";
import Facebook from "../../components/Icon/FacebookIcon";
import MessagesIcon from "../../components/Icon/MessagesIcon";
import QuestionList from "../post/QuestionList";
import NoQuestion from "../post/NoQuestion";

const AnswerPage = () => {
  //현재 url 받아오기
  const location = useLocation();

  // listPage에서 현재 상태 받아옴
  const { id, name, imageSource } = location.state || {};
  // 현재상태 저장
  const [userName, setUserName] = useState(name || "");
  const [userId, setUserId] = useState(id || "");
  const [img, setImg] = useState(imageSource || "");

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

  useEffect(() => {
    if (!userId) return;

    const fetchQuestions = async () => {
      try {
        const data = await getQuestions(userId);
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

  return (
    <div className="inner qAPage">
      <div className="profileContents">
        <img src={img} alt="큰 프로필" />
        <h2>{userName}</h2>
        <div className="BtnContents">
          <Button variant="round" size="xsmall" className="styleLink" leftIcon={<Link />} />
          <Button variant="round" size="xsmall" className="styleKakao" leftIcon={<Kakao />} />
          <Button variant="round" size="xsmall" className="styleFacebook" leftIcon={<Facebook />} />
        </div>
      </div>
      <Button variant="round" size="medium" className="removeBtn">
        삭제하기
      </Button>
      <div className="container">
        <h3>
          <MessagesIcon />
          {queList.length ? `${queList.length}개의 질문이 있습니다` : `아직 질문이 없습니다`}
        </h3>
        {queList.length ? <QuestionList data={queList} img={img} userName={userName} dayjs={dayjs} /> : <NoQuestion />}
      </div>
    </div>
  );
};

export default AnswerPage;
