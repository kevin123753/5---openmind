import { useState, useEffect } from "react";
import Badge from "../../../components/Badge/Badge";
import Button from "../../../components/Button/Button";
import Reaction from "../../../components/Reaction/Reaction";
import MoreIcon from "../../../components/Icon/MoreIcon";
import KebabEditIcon from "../../../components/Icon/KebabEditIcon";
import KebabCloseIcon from "../../../components/Icon/KebabCloseIcon";
import AnswerList from "./AnswerList";
import { putAnswer, postAnswer } from "../../../api/answerApi";
import { deleteQuestion } from "../../../api/questionApi";

const QuestionList = ({
  data,
  img,
  userName,
  dayjs,
  handleClick,
  onDataUpdate,
}) => {
  const [questionId, setQuestionId] = useState(null);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [newAnswerContents, setNewAnswerContents] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);

  // 컴포넌트 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      setQuestionId(null);
      setEditingAnswerId(null);
      setEditedContent("");
      setNewAnswerContents(new Map());
    };
  }, []);

  // 새 답변 내용 업데이트 함수
  const updateNewAnswerContent = (questionId, content) => {
    setNewAnswerContents((prev) => new Map(prev).set(questionId, content));
  };

  // 수정하기 버튼 클릭 핸들러
  const handleEditClick = (item) => {
    if (item.answer) {
      setEditingAnswerId(item.answer.id);
      setEditedContent(item.answer.content || "");
      setQuestionId(null); // 케밥 메뉴 닫기
    }
  };

  // 수정 완료 핸들러
  const handleEditComplete = async (answerId) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // 거절된 답변을 수정할 때는 isRejected를 false로 설정
      // content가 비어있으면 기본값 사용
      const content = editedContent.trim() || "답변 내용";
      const isRejected = false;

      const result = await putAnswer(answerId, { content, isRejected });

      // ✅ 즉시 UI 업데이트
      const updatedData = data.map((question) => {
        if (question.answer?.id === answerId) {
          return {
            ...question,
            answer: {
              ...question.answer,
              ...result,
              content,
              isRejected: false,
            },
          };
        }
        return question;
      });

      setEditingAnswerId(null);
      setEditedContent("");

      // 부모 컴포넌트에 업데이트된 데이터 전달
      if (onDataUpdate) {
        onDataUpdate(updatedData);
      }
    } catch (error) {
      console.error("답변 수정 실패:", error);
      alert("답변 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 새 답변 작성 핸들러
  const handleNewAnswer = async (questionId) => {
    if (isLoading) return;

    const content = newAnswerContents.get(questionId) || "";
    if (!content.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      // 현재 질문의 상태 확인
      const currentQuestion = data.find((q) => q.id === questionId);
      const hasAnswer = !!currentQuestion?.answer;
      const hasContent = !!currentQuestion?.answer?.content;
      const isRejected = currentQuestion?.answer?.isRejected;

      console.log("🔍 답변 작성 시작:", {
        questionId,
        hasAnswer,
        hasContent,
        isRejected,
        content: content.trim(),
      });

      let result;
      if (!hasAnswer) {
        // 답변이 없는 경우: 새로 생성
        console.log("📝 새 답변 생성 시도 중");
        result = await postAnswer(questionId, {
          content: content.trim(),
          isRejected: false,
        });
      } else {
        // 답변이 있지만 content가 null이거나 거절 취소된 경우: 수정
        console.log("🔄 기존 답변 수정 시도 중:", {
          answerId: currentQuestion.answer.id,
          content: content.trim(),
          isRejected: false,
        });
        result = await putAnswer(currentQuestion.answer.id, {
          content: content.trim(),
          isRejected: false,
        });
      }

      // ✅ 즉시 UI 업데이트
      const updatedData = data.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            answer: {
              ...question.answer,
              ...result,
              content: content.trim(),
              isRejected: false,
            },
          };
        }
        return question;
      });

      // 해당 질문의 답변 내용 초기화
      setNewAnswerContents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(questionId);
        return newMap;
      });

      // 부모 컴포넌트에 업데이트된 데이터 전달
      if (onDataUpdate) {
        onDataUpdate(updatedData);
      }
    } catch (error) {
      console.error("답변 작성 실패:", error);
      alert("답변 작성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 삭제하기 버튼 클릭 핸들러
  const handleDeleteClick = async (item) => {
    if (isLoading) return;

    if (window.confirm("정말로 이 질문을 삭제하시겠습니까?")) {
      setIsLoading(true);
      try {
        console.log("삭제 시도 중:", item.id);
        await deleteQuestion(item.id);
        console.log("삭제 성공:", item.id);

        // 성공 시 즉시 UI에서 해당 질문 제거
        const updatedData = data.filter((question) => question.id !== item.id);
        if (onDataUpdate) {
          // 부모 컴포넌트에 업데이트된 데이터 전달
          onDataUpdate(updatedData);
        }

        setQuestionId(null); // 케밥 메뉴 닫기
      } catch (error) {
        console.error("질문 삭제 실패:", error);
        console.error("삭제 실패한 질문 ID:", item.id);
        alert(`질문 삭제에 실패했습니다. (${error.message})`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 답변 거절/취소 핸들러
  const handleRejectToggle = async (item) => {
    if (isLoading) return;

    const isCurrentlyRejected = item.answer?.isRejected;
    const action = isCurrentlyRejected ? "거절 취소" : "답변 거절";

    console.log("🔍 답변 거절/취소 시작:", {
      questionId: item.id,
      hasAnswer: !!item.answer,
      answerId: item.answer?.id,
      isCurrentlyRejected,
      action,
    });

    if (window.confirm(`정말로 ${action}하시겠습니까?`)) {
      setIsLoading(true);
      try {
        if (!item.answer) {
          // 답변이 없는 경우: 새로 생성
          console.log("📝 답변 거절 생성 시도 중:", {
            questionId: item.id,
            content: "거절 처리됨",
            isRejected: true,
          });
          const result = await postAnswer(item.id, {
            content: "거절 처리됨",
            isRejected: true,
          });
          console.log("✅ 답변 거절 생성 성공:", result);
        } else {
          // 답변이 있는 경우: 상태 변경
          console.log("🔄 답변 거절 상태 변경 시도 중:", {
            answerId: item.answer.id,
            content: item.answer.content || "거절 처리됨",
            isRejected: !isCurrentlyRejected,
          });
          const result = await putAnswer(item.answer.id, {
            content: item.answer.content || "거절 처리됨",
            isRejected: !isCurrentlyRejected,
          });
          console.log("✅ 답변 거절 상태 변경 성공:", result);
        }

        // 거절 취소 시 해당 질문의 답변 내용 초기화
        if (isCurrentlyRejected) {
          setNewAnswerContents((prev) => {
            const newMap = new Map(prev);
            newMap.delete(item.id);
            return newMap;
          });
        }

        // 부모 컴포넌트에 데이터 업데이트 알림
        if (onDataUpdate) {
          onDataUpdate(); // 데이터 새로고침
        }

        setQuestionId(null); // 케밥 메뉴 닫기
      } catch (error) {
        console.error("❌ 답변 거절 처리 실패:", {
          error: error.message,
          stack: error.stack,
          questionId: item.id,
          answerId: item.answer?.id,
        });
        alert("처리 중 오류가 발생했습니다");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 케밥 메뉴 클릭 이벤트 전파 방지
  const handleKebabClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {data.map((item) => (
        <div className="items shadow-1" key={item.id}>
          <div className="qnaTop">
            <Badge
              badgeActive={
                item.answer &&
                item.answer.isRejected === false &&
                !!item.answer.content
              }
            />
            <Button
              rightIcon={<MoreIcon />}
              onClick={(e) => {
                e.stopPropagation();
                setQuestionId(questionId === item.id ? null : item.id);
              }}
            />
            {questionId === item.id && (
              <div className="kebabMenu" onClick={handleKebabClick}>
                <Button
                  leftIcon={<KebabEditIcon />}
                  className="editBtn"
                  onClick={() => handleEditClick(item)}
                  disabled={!item.answer || isLoading}
                >
                  수정하기
                </Button>
                <Button
                  leftIcon={<KebabCloseIcon />}
                  className="closeBtn"
                  onClick={() => handleDeleteClick(item)}
                  disabled={isLoading}
                >
                  삭제하기
                </Button>
                {/* 답변 거절/취소 버튼 - 답변이 없거나 거절된 경우에만 표시 */}
                {(!item.answer ||
                  item.answer?.isRejected ||
                  (!item.answer?.content && !item.answer?.isRejected)) && (
                  <Button
                    className="rejectBtn"
                    onClick={() => handleRejectToggle(item)}
                    disabled={isLoading}
                  >
                    {item.answer?.isRejected ? "거절 취소" : "답변 거절"}
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="titleContent" onClick={() => handleClick(item.id)}>
            <p className="subTitle">
              질문<span>{dayjs(item.createdAt).fromNow()}</span>
            </p>
            <p className="title">{item.content}</p>
          </div>
          <AnswerList
            item={item}
            img={img}
            userName={userName}
            editingAnswerId={editingAnswerId}
            editedContent={editedContent}
            setEditedContent={setEditedContent}
            onEditComplete={handleEditComplete}
            newAnswerContent={newAnswerContents.get(item.id) || ""}
            setNewAnswerContent={(content) =>
              updateNewAnswerContent(item.id, content)
            }
            onNewAnswer={handleNewAnswer}
            isLoading={isLoading}
          />
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
