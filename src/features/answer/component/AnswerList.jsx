/****** dayjs 라이브러리 ******/
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

const AnswerList = ({
  item,
  img,
  userName,
  editingAnswerId,
  editedContent,
  setEditedContent,
  onEditComplete,
  newAnswerContent,
  setNewAnswerContent,
  onNewAnswer,
  isLoading = false,
}) => {
  const isEditing = editingAnswerId === item.answer?.id;

  return (
    <div className="questionContent">
      <img src={img} alt="작은 프로필" />
      <div>
        <p className="user">
          {userName}
          {/* <span>{dayjs(item.createdAt).fromNow()}</span> */}
        </p>
        <div>
          {isEditing ? (
            // 수정 모드 - 기존 답변이 있는 경우
            <div>
              <Input
                type="textarea"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="답변을 입력해주세요"
                disabled={isLoading}
              />
              <Button
                disabled={!editedContent.trim() || isLoading}
                onClick={() => onEditComplete(item.answer.id)}
              >
                {isLoading ? "수정 중..." : "수정완료"}
              </Button>
            </div>
          ) : (
            // 보기 모드 또는 새 답변 작성 모드
            <>
              {!item.answer ? (
                // 답변이 없는 경우 - 새 답변 작성 폼
                <div>
                  <Input
                    type="textarea"
                    value={newAnswerContent}
                    onChange={(e) => setNewAnswerContent(e.target.value)}
                    placeholder="답변을 입력해주세요"
                    disabled={isLoading}
                  />
                  <Button
                    disabled={!newAnswerContent.trim() || isLoading}
                    onClick={() => onNewAnswer(item.id)}
                  >
                    {isLoading ? "답변 중..." : "답변완료"}
                  </Button>
                </div>
              ) : (
                // 답변이 있는 경우 - 답변 내용 표시
                <div className="qnaContent">
                  {!item.answer.isRejected ? (
                    <div>답변{item.answer.content}</div>
                  ) : (
                    <p className="rejectedText">답변 거절</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerList;
