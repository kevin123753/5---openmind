import { useState } from "react";
import Button from "../../components/Button/Button";
import { createSubject } from "./mainService";
const Main = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const subject = await createSubject(name);
      console.log("생성된 질문 대상:", subject);

      localStorage.setItem("id", subject.id);
      localStorage.setItem("name", subject.name);

      alert(`"${subject.name}"님이 등록되었습니다!`);
    } catch (error) {
      console.error("에러 발생:", error);
      alert("질문 대상 생성에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>오픈마인드로고</h1>
      <form className="mainForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="이름을 입력하세요"
          className="mainFormInput"
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="primary" size="medium" className="mainFormBtn">
          질문받기
        </Button>
      </form>
    </div>
  );
};

export default Main;
