const AnswerList = ({ item, img, userName }) => {
  return (
    <div className="questionContent">
      <img src={img} alt="작은 프로필" />
      <div>
        <p className="user">
          {userName}
          <span>{item.createdAt}</span>
        </p>
        {!item.answer.isRejected ? (
          <div className="qnaContent">{item.answer.content}</div>
        ) : (
          <p className="rejectedText">답변 거절</p>
        )}
      </div>
    </div>
  );
};

export default AnswerList;
