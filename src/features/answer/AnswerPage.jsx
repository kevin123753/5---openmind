import { useEffect, useState } from "react";

// css
import "../post/QnA.css";
// component
import Button from "../../components/Button/Button";
import Link from "../../components/Icon/LinkIcon";
import Kakao from "../../components/Icon/KakaoIcon";
import Facebook from "../../components/Icon/FacebookIcon";
// data
import UserNameContext from "../../context/userNameContext";

const PostPage = () => {
  useEffect(() => {
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("mySubjectId");
    setUserName(name);
    setId(id);
  }, []);
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const [queList, setQueList] = useState([]);
  console.log(queList);
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
      </div>
    </UserNameContext.Provider>
  );
};

export default PostPage;
