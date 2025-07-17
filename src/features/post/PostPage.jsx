import { useEffect, useState } from "react";

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
// data
import UserNameContext from "../../context/userNameContext";

//시간 dayjs 라이브러리

const PostPage = () => {
  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("name"));
    const id = localStorage.getItem("mySubjectId");
    const profileImg = JSON.parse(localStorage.getItem("imageSource"));
    setUserName(name);
    setId(id);
    setImg(profileImg);
  }, []);
  // 로컬스토리지 받아온값 저장
  const [userName, setUserName] = useState();
  const [id, setId] = useState("");
  const [img, setImg] = useState();

  // 모달창 열고 닫기
  const [modal, setModal] = useState(false);
  // 모달에서 받아온 질문 저장
  const [queList, setQueList] = useState([]);

  return (
    <UserNameContext.Provider value={userName}>
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
        <div className="container">
          <h3>
            <MessagesIcon />
            {queList.length ? `${queList.length}개의 질문이 있습니다` : `아직 질문이 없습니다`}
          </h3>
          {queList.length ? <QuestionList data={queList} /> : <NoQuestion />}
        </div>
        <Button variant="round" size="large" className="shadow-2 queBtn" onClick={() => setModal(!modal)}>
          질문 작성하기
        </Button>
        {modal && <Modal setModal={setModal} id={id} queList={queList} setQueList={setQueList} img={img} />}
      </div>
    </UserNameContext.Provider>
  );
};

export default PostPage;
