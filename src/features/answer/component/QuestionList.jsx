import { useState } from "react";
import Badge from "../../../components/Badge/Badge";
import Button from "../../../components/Button/Button";
import Reaction from "../../../components/Reaction/Reaction";
import MoreIcon from "../../../components/Icon/MoreIcon";
import KebabEditIcon from "../../../components/Icon/KebabEditIcon";
import KebabCloseIcon from "../../../components/Icon/KebabCloseIcon";
import AnswerList from "./AnswerList";

const QuestionList = ({ data, img, userName, dayjs, handleClick }) => {
  const [questionId, setQuestionId] = useState(null);

  return (
    <>
      {data.map((item) => (
        <>
          <div className="items shadow-1" key={item.id} onClick={() => handleClick(item.id)}>
            <div className="qnaTop">
              <Badge badgeActive={item.answer !== null} />
              <Button rightIcon={<MoreIcon />} onClick={() => setQuestionId(questionId === item.id ? null : item.id)} />
              {questionId === item.id && (
                <div className="kebabMenu">
                  <Button leftIcon={<KebabEditIcon />} className="editBtn">
                    수정하기
                  </Button>
                  <Button leftIcon={<KebabCloseIcon />} className="closeBtn">
                    삭제하기
                  </Button>
                </div>
              )}
            </div>
            <div className="titleContent">
              <p className="subTitle">
                질문<span>{dayjs(item.createdAt).fromNow()}</span>
              </p>
              <p className="title">{item.content}</p>
            </div>
            <AnswerList item={item} img={img} userName={userName} />
            {/* {item.answer && <AnswerList item={item} img={img} userName={userName} />} */}
            <div className="likeContent">
              <Reaction like={item.like} dislike={item.dislike} questionId={item.id} />
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default QuestionList;
