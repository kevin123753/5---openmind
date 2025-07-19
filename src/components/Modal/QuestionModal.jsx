import { useEffect, useState } from "react";
import { createQuestion } from "../../features/post/postService";

import styles from "./Modal.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import CloseIcon from "../Icon/modalCloseIcon";
import Messages from "../Icon/Messages";

const Modal = ({ setModal, id, setQueList, img, userName }) => {
  const [question, setQuestion] = useState("");

  // 질문 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("content", question);
  }, [question]);

  // 질문 보내기
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuestion = await createQuestion(id, question);
      setQueList((prev) => [newQuestion, ...prev]);
      setModal(false);
    } catch (err) {
      alert("전송실패");
      console.error(err);
    }
  };

  return (
    <div className={`${styles.modalContainer} ${styles.dimmBg}`}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div className={styles.titleWithIcon}>
            <Messages className={styles.icon} />
            <h3 className={styles.question}>질문을 작성하세요</h3>
          </div>
          <Button
            leftIcon={<CloseIcon />}
            onClick={() => setModal(false)}
          ></Button>
        </div>
        <form onSubmit={handleSubmit}>
          <p className={styles.title}>
            To.
            <img src={img} alt="사용자프로필 사진" />
            <span>{userName}</span>
          </p>
          <Input
            type="textarea"
            variant="primary"
            size="large"
            placeholder="질문을 입력해주세요"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ height: "20rem" }}
          />
          <Button
            variant="primary"
            size="large"
            className={styles.submitBtn}
            disabled={!question.trim()}
          >
            질문 보내기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
