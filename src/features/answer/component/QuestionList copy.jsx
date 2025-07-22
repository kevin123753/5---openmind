import Badge from "../../../components/Badge/Badge";
import Reaction from "../../../components/Reaction/Reaction";
import AnswerList from "./AnswerList";
import AnswerForm from "../../answer/AnswerForm"; // ✅ 추가됨
import styles from "./QuestionList.module.css";
import Button from "../../../components/Button/Button";
import MoreIcon from "../../../components/Icon/MoreIcon";
const QuestionList = ({
  data,
  img,
  userName,
  dayjs,
  observerRef,
  handleClick = () => {},
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
        const answer = item.answer;
        const isEditing = editingAnswerId === answer?.id;
        const hasAnswer = !!answer;
        const isRejected = answer?.isRejected;

        // ✅ 수정: AnswerPage + 답변이 없거나 + content가 비었거나 + 수정 중일 때만 AnswerForm
        const showAnswerForm =
          isAnswerPage &&
          (!hasAnswer || !answer?.content || isEditing) &&
          !isRejected;

        return (
          <div
            className="items shadow-1"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <div className="qnaTop">
              <Badge badgeActive={hasAnswer && !isRejected} />
              <Button rightIcon={<MoreIcon />} />
            </div>
            <div className="titleContent">
              <p className="subTitle">
                {hasAnswer && !isRejected ? "답변완료" : "미답변"}
                <span>{dayjs(item.createdAt).fromNow()}</span>
              </p>
              <p className="title">{item.content}</p>
            </div>

            {showAnswerForm ? (
              <AnswerForm
                question={item}
                subject={subject}
                isEditing={isEditing}
                initialContent={answer?.content || ""}
                onSuccess={onAnswerSuccess}
                onCancel={onCancelEdit}
              />
            ) : (
              <>
                {/* ✅ 변경: answer가 있고 isRejected가 false일 때만 AnswerList 렌더링 */}
                {hasAnswer && !isRejected && (
                  <AnswerList item={item} img={img} userName={userName} />
                )}

                {/* ✅ 케밥 메뉴 조건부 렌더링 */}
                {editable && (
                  <div className={styles["menu-wrapper"]}>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={styles["menu-button"]}
                    >
                      ⋮
                    </button>

                    {/* ✅ 변경: answer가 존재하고 isRejected가 false일 때만 드롭다운 표시 */}
                    {openMenuId === item.id && hasAnswer && !isRejected && (
                      <ul className={styles["dropdown-menu"]}>
                        <li
                          className={styles["dropdown-item"]}
                          onClick={() => onEdit(answer)}
                        >
                          수정하기
                        </li>
                        <li
                          className={styles["dropdown-item"]}
                          onClick={() => handleReject(answer.id)}
                        >
                          답변 거절
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </>
            )}

            <div ref={observerRef} style={{ height: "1px" }}></div>
          </div>
        );
      })}
    </>
  );
};

export default QuestionList;
