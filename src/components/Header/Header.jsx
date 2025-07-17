import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import Button from "../Button/Button";
import HeaderLogo from "../Icon/HeaderLogo";
import ArrowRight from "../Icon/ArrowRightIcon";
const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <HeaderLogo />
      </Link>
      <Button variant="outline" size="medium" rightIcon={<ArrowRight />}>
        질문하러가기
      </Button>
    </header>
  );
};

export default Header;
