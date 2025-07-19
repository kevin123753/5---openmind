import { useEffect, useState } from "react";

import styles from "../../../components/Modal/Modal.module.css";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import CloseIcon from "../../../components/Icon/modalCloseIcon";
import Messages from "../../../components/Icon/Messages";

const Modal = ({ setModal, img, userName }) => {
  const [question, setQuestion] = useState("");

  // 질문 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("content", question);
  }, [question]);

  return (
    <div className={`${styles.modalContainer} ${styles.dimmBg}`}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div className={styles.titleWithIcon}>
            <Messages className={styles.icon} />
            <h3 className={styles.question}>질문을 작성하세요</h3>
          </div>
          <Button leftIcon={<CloseIcon />} onClick={() => setModal(false)}></Button>
        </div>
        <form>
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
          <Button variant="primary" size="large" className={styles.submitBtn} disabled={!question.trim()}>
            질문 보내기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
