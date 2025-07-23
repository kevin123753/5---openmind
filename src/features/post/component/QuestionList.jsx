import Badge from "../../../components/Badge/Badge";
import Reaction from "../../../components/Reaction/Reaction";

const QuestionList = ({ data, dayjs, handleClick }) => {
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
