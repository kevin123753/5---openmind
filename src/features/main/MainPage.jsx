// ✅ [MainPage.jsx] 메인 페이지 – 질문 대상 생성 및 피드 이동

// 📌 1. 상태 관리
// - name: 사용자 입력값 (질문 대상 이름)
// - isLoading: 요청 중 상태 (버튼 비활성화용)
// - error: 빈 문자열 or 오류 발생 시 메시지 처리 (선택)

// 📌 2. 입력 필드
// - placeholder: "이름을 입력하세요"
// - onChange 이벤트로 name 상태 업데이트
// - 입력값이 없을 경우 버튼 비활성화 처리

// 📌 3. 질문 받기 버튼
// - 클릭 시 createSubject(name) API 호출
// - 생성된 subject 객체의 id를 받아서 `/post/{id}/answer` 페이지로 이동
// - 이동은 useNavigate() 사용
// - 클릭 시 form 제출 막기 (e.preventDefault())

// 📌 4. 오류 처리 (선택)
// - API 실패 시 에러 메시지 출력 (alert 또는 텍스트)
// - 입력값 공백일 경우 리턴

// 📌 5. 스타일링 및 구조
// - Header 제외한 중앙 정렬 레이아웃
// - 입력창 + 버튼 수직 정렬
// - 반응형 대응: 모바일/태블릿에서도 중앙 배치 유지

// 📌 6. 사용 예시 흐름
// - 이름 입력 → 버튼 클릭 → API 요청 → 피드 생성 성공 → 피드 페이지로 이동
import styles from "./MainPage.module.css";
import homeBackLogo from "../../assets/homeBackLogo.png";
import openmindLogo from "../../assets/openmindLogo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import PersonIcon from "../../components/icon/PersonIcon";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createSubjectAndNavigate } from "./mainService";
import ArrowRightIcon from "../../components/icon/ArrowRightIcon";
import useResponsiveSize from "../../hooks/useResponsiveSize";

function MainPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const size = useResponsiveSize();

  const handleClick = () => {
    navigate("/list");
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createSubjectAndNavigate(name, navigate, setError, setIsLoading);
  };

  return (
    <div className={styles["home-page"]}>
      <img
        src={openmindLogo}
        alt="OpenMind 로고"
        className={styles["home-logo"]}
      />

      <img
        src={homeBackLogo}
        className={styles["home-back-logo"]}
        alt="OpenMind 배경이미지"
      />

      <div className={styles["home-question-button"]}>
        <Button
          variant="outline"
          size={size}
          rightIcon={<ArrowRightIcon />}
          onClick={handleClick}
        >
          질문하러 가기
        </Button>
      </div>
      <form className={styles["home-form"]} onSubmit={handleSubmit}>
        <Input
          placeholder="이름을 입력하세요"
          size={size}
          variant="primary"
          icon={<PersonIcon />}
          value={name}
          onChange={handleChange}
        />
        <Button
          variant="primary"
          size="medium"
          disabled={isLoading || !name.trim()}
        >
          {isLoading ? "로딩중입니다..." : "질문 받기"}
        </Button>
      </form>
    </div>
  );
}

export default MainPage;
