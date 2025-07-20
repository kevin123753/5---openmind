import Badge from "../../../components/Badge/Badge";
import Reaction from "../../../components/Reaction/Reaction";
import AnswerList from "./AnswerList";

const QuestionList = ({ data, img, userName, dayjs, observerRef, handleClick }) => {
  return (
    <>
      {data.map((item) => (
        <>
          <div className="items shadow-1" key={item.id} onClick={() => handleClick(item.id)}>
            <Badge badgeActive={item.answer !== null} />
            <div className="titleContent">
              <p className="subTitle">
                질문<span>{dayjs(item.createdAt).fromNow()}</span>
              </p>
              <p className="title">{item.content}</p>
            </div>
            {item.answer && <AnswerList item={item} img={img} userName={userName} />}
            <div className="likeContent">
              <Reaction like={item.like} dislike={item.dislike} questionId={item.id} />
            </div>
          </div>
          <div ref={observerRef} style={{ height: "1px" }}></div>
        </>
      ))}
    </>
  );
};

export default QuestionList;
