/****** dayjs 라이브러리 ******/
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

const AnswerList = ({ item, img, userName }) => {
  return (
    <div className="questionContent">
      <img src={img} alt="작은 프로필" />
      <div>
        <p className="user">
          {userName}
          {/* <span>{dayjs(item.createdAt).fromNow()}</span> */}
        </p>
        <div>
          <Input type="textarea" />
          <Button>답변완료</Button>
        </div>
        {/* {!item.answer.isRejected ? (
          <div className="qnaContent">답변{item.answer.content}</div>
        ) : (
          <p className="rejected">답변거절</p>
        )} */}
      </div>
    </div>
  );
};

export default AnswerList;
