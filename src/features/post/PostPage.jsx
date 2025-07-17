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
import Modal from "../../components/Modal/Modal";
// data
import UserNameContext from "../../context/userNameContext";

const PostPage = () => {
  useEffect(() => {
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    setUserName(name);
    setId(id);
  }, []);
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const [modal, setModal] = useState(false);
  const [queList, setQueList] = useState([]);

  return (
    <UserNameContext.Provider value={userName}>
      <div className="inner qAPage">
        <div className="profileContents">
          <img src="/image/post/profile1.jpg" alt="큰 프로필" />
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
        {modal && <Modal setModal={setModal} id={id} queList={queList} setQueList={setQueList} />}
      </div>
    </UserNameContext.Provider>
  );
};

export default PostPage;
