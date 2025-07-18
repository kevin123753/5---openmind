import { Link, useLocation, useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorage";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import HeaderLogo from "../Icon/HeaderLogo";
import ArrowRight from "../Icon/ArrowRightIcon";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const subjectId = getItem("mySubjectId");

  const handleClick = () => {
    if (!subjectId) {
      navigate("/");
    } else {
      navigate(`/post/${subjectId}/answer`);
    }
  };

  console.log(pathname);
  return (
    <header className="header">
      {pathname !== "/" ? (
        <Link to="/">
          <HeaderLogo />
        </Link>
      ) : null}
      {pathname === "/" ? (
        <Button
          variant="outline"
          size="medium"
          rightIcon={<ArrowRight />}
          onClick={() => {
            navigate("/list");
          }}>
          질문하러가기
        </Button>
      ) : pathname === "/list" ? (
        <Button variant="outline" size="medium" rightIcon={<ArrowRight />} onClick={handleClick}>
          답변하러가기
        </Button>
      ) : null}
    </header>
  );
};

export default Header;
