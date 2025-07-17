import Badge from "../../components/Badge/Badge";
import Reaction from "../../components/Reaction/Reaction";
import AnswerList from "../post/AnswerList";

const QuestionList = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <div className="items shadow-1" key={item.id}>
          <Badge badgeActive={item.answer !== null} />
          <div className="titleContent">
            <p className="subTitle">
              질문<span>{item.createdAt}</span>
            </p>
            <p className="title">{item.content}</p>
          </div>
          {item.answer && <AnswerList item={item} />}
          <div className="likeContent">
            <Reaction like={item.like} dislike={item.dislike} />
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionList;
