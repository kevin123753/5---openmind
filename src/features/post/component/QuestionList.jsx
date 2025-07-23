import Badge from "../../../components/Badge/Badge";
import Button from "../../../components/Button/Button";
import Reaction from "../../../components/Reaction/Reaction";

const QuestionList = ({ data, dayjs, handleClick, img, userName }) => {
  return (
    <>
      {data.map((item) => (
        <div className="items shadow-1" key={item.id}>
          <Badge
            badgeActive={
              item.answer &&
              item.answer.isRejected === false &&
              !!item.answer.content
            }
          />

          <div className="titleContent" onClick={() => handleClick(item.id)}>
            <p className="subTitle">
              질문<span>{dayjs(item.createdAt).fromNow()}</span>
            </p>
            <p className="title">{item.content}</p>
          </div>

          {/* 답변 표시 영역 */}
          {item.answer && (
            <div className="questionContent">
              <img src={img} alt="작은 프로필" />
              <div>
                <p className="user">{userName}</p>
                <div>
                  {item.answer.isRejected ? (
                    <div className="qnaContent">
                      <p className="rejectedText">답변 거절됨</p>
                    </div>
                  ) : item.answer.content ? (
                    <div className="qnaContent">
                      <div>{item.answer.content}</div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          <div className="likeContent">
            <Reaction
              like={item.like}
              dislike={item.dislike}
              questionId={item.id}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionList;
