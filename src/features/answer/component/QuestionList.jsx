import Badge from "../../../components/Badge/Badge";
import Reaction from "../../../components/Reaction/Reaction";
import AnswerList from "./AnswerList";
import styles from "./QuestionList.module.css"; //✅ 스타일 추가
import Button from "../../../components/Button/Button"; // ✅ 추가됨
import MoreIcon from "../../../components/Icon/MoreIcon"; // ✅ 추가됨
const QuestionList = ({
  data,
  img,
  userName,
  dayjs,
  handleClick,
  isAnswerPage = false, // ✅ 추가됨: AnswerPage 여부 판단용
  editable = false, // ✅ 추가됨: 케밥 메뉴를 보여줄지 여부

  editingAnswerId, // ✅ 추가됨: 현재 수정 중인 답변 id
  onEdit = () => {}, // ✅ 추가됨: 수정하기 클릭 시 콜백
  onCancelEdit = () => {}, // ✅ 추가됨: 수정 취소 시 콜백
  onAnswerSuccess = () => {}, // ✅ 추가됨: 답변 작성/수정 완료 후 콜백

  subject = {}, // ✅ 추가됨: AnswerForm용

  openMenuId = null, // ✅ 추가됨: 현재 열린 케밥 메뉴의 질문 id
  toggleMenu = () => {}, // ✅ 추가됨: ⋮ 버튼 클릭 시 메뉴 열기/닫기
  handleReject = () => {}, // ✅ 추가됨: 답변 거절 콜백
}) => {
  return (
    <>
      {data.map((item) => {
        const answer = item.answer; // ✅ 추가됨
        const hasAnswer = !!answer; // ✅ 추가됨
        const isRejected = answer?.isRejected; // ✅ 추가됨
        const isEditing = editingAnswerId === answer?.id; // ✅ 추가됨

        return (
          <div
            className="items shadow-1"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <div className="qnaTop">
              <Badge badgeActive={hasAnswer && !isRejected} />
              {/* ✅ 케밥 메뉴 조건부 렌더링  추가한부분*/}
              {editable && (
                <div>
                  <Button
                    rightIcon={<MoreIcon />}
                    onClick={(e) => {
                      e.stopPropagation(); // 카드 클릭 방지
                      toggleMenu(item.id);
                    }}
                  />
                  {/* ✅  드롭다운은 항상 표시되되, 조건부 실행만 제한 */}
                  {openMenuId === item.id && (
                    <ul>
                      <li
                        onClick={() => {
                          // ✅ 답변이 없으면 아무 것도 실행하지 않음
                          if (!hasAnswer) return;
                          onEdit(answer);
                        }}
                      >
                        수정하기
                      </li>
                      <li
                        onClick={() => {
                          // ✅ 이미 거절된 답변이면 무시
                          if (isRejected) return;
                          handleReject(answer?.id);
                        }}
                      >
                        답변 거절
                      </li>
                    </ul>
                  )}
                </div>
              )}
              {/* ✅ 케밥 메뉴 조건부 렌더링  추가한부분*/}
            </div>
            <div className="titleContent">
              <p className="subTitle">
                질문<span>{dayjs(item.createdAt).fromNow()}</span>
              </p>
              <p className="title">{item.content}</p>
            </div>
            {item.answer && (
              <AnswerList item={item} img={img} userName={userName} />
            )}
            <div className="likeContent">
              <Reaction
                like={item.like}
                dislike={item.dislike}
                questionId={item.id}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default QuestionList;
