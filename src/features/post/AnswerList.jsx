import { useContext } from "react";
import UserNameContext from "../../context/userNameContext";

const AnswerList = ({ item }) => {
  const userName = useContext(UserNameContext);
  return (
    <div className="questionContent">
      <img src="/image/post/profile1.jpg" alt="작은 프로필" />
      <div>
        <p className="user">
          {userName}
          <span>2주전</span>
        </p>
        {!item.answer.isRejected ? (
          <div className="qnaContent">{item.answer.content}</div>
        ) : (
          <p className="rejected">답변거절</p>
        )}
      </div>
    </div>
  );
};

export default AnswerList;
