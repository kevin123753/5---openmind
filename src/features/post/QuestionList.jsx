import Badge from "../../components/Badge/Badge";
import Reaction from "../../components/Reaction/Reaction";
import AnswerList from "../post/AnswerList";

const QuestionList = ({ data }) => {
  //  답변하기 컴포넌트 어디까지 나눠야하는지!!
  return (
    <>
      {data.map((item) => (
        <div className="items shadow-1" key={item.id}>
          {/* answer 없을때 undefined 반환 맞는지 확인해봐야함! */}
          <Badge badgeActive={item.answer !== undefined} />
          <div className="titleContent">
            <p className="subTitle">
              질문<span>2주전</span>
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
