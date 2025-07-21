import styles from "./MainPage.module.css";
// import homeBackLogo from "../../assets/homeBackLogo.png";
import openmindLogo from "../../assets/openmindLogo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import PersonIcon from "../../components/Icon/PersonIcon";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createSubjectAndNavigate } from "./mainService";
// import ArrowRightIcon from "../../components/Icon/ArrowRightIcon";
import useResponsiveSize from "../../hooks/useResponsiveSize";

function MainPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const size = useResponsiveSize();

  // const handleClick = () => {
  //   navigate("/list");
  // };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createSubjectAndNavigate(name, navigate, setError, setIsLoading);
  };

  return (
    <div className={styles.homePage}>
      <img src={openmindLogo} alt="OpenMind 로고" className={styles.logo} />

      {/* <img src={homeBackLogo} className={styles["home-back-logo"]} alt="OpenMind 배경이미지" />

      <div className={styles["home-question-button"]}>
        <Button variant="outline" size={size} rightIcon={<ArrowRightIcon />} onClick={handleClick}>
          질문하러 가기
        </Button>
      </div>  */}
      <form className={styles.homeForm} onSubmit={handleSubmit}>
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
