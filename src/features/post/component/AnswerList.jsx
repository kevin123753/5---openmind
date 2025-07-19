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
          <div className="qnaContent">답변{item.answer.content}</div>
        ) : (
          <p className="rejected">답변거절</p>
        )}
      </div>
    </div>
  );
};

export default AnswerList;
