import { useState, useEffect } from "react";
import Button from "../../components/Button/Button.jsx";
import UserCard from "../../components/UserCard/UserCard.jsx";
import { getItem } from "../../utils/localStorage";
import { useNavigate, Link } from "react-router-dom";
import styles from "./ListPage.module.css";
// import openmindLogo from "../../assets/openmindLogo.png";
// import ArrowRightIcon from "../../components/icon/ArrowRightIcon";
import ArrowDownIcon from "../../components/Icon/ArrowDownIcon.jsx";
import ArrowUpIcon from "../../components/Icon/ArrowUpIcon.jsx";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import { getSubject } from "../../api/subjectApi";

function QuestionListPage() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("name");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0); // totalCount → count

  const limit = 8;
  const pageGroupSize = 5;
  const totalPages = Math.ceil(count / limit); // totalCount → count
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
  const size = useResponsiveSize();

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handlePrevGroup = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - 1);
    }
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentPage(endPage + 1);
    }
  };

  const navigate = useNavigate();
  // const subjectId = getItem("mySubjectId");

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const offset = (currentPage - 1) * limit;
      const data = await getSubject({ sort, offset, limit });
      setSubjects(data.results || []);
      setCount(data.count || 0); // totalCount → count
    } catch (error) {
      setError(error.message || "잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [currentPage, sort]);

  const handleSortChange = (value) => {
    setSort(value);
  const handleSortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
    setDropdownOpen(false);
    setDropdownOpen(false);
  };

  // const handleClick = () => {
  //   if (!subjectId) {
  //     navigate("/");
  //   } else {
  //     navigate(`/post/${subjectId}/answer`);
  //   }
  // };

  const handleCardClick = (subject) => {
    if (!subject.id) {
      alert("질문 대상이 없습니다.");
    } else {
      navigate(`/post/${subject.id}`, {
        state: {
          id: subject.id,
          name: subject.name,
          imageSource: subject.imageSource,
        },
      });
    }
  };

  return (
    <div className={styles.listPage}>
      {/* <div className={styles["top-row"]}>
          <Link to="/" className={styles["logo-link"]}>
            <img
              src={openmindLogo}
              alt="메인페이지 가기"
              className={styles["list-logo"]}
            />
            <img
              src={openmindLogo}
              alt="메인페이지 가기"
              className={styles["list-logo"]}
            />
          </Link>
          <div className={styles["list-answer-button"]}>
            <Button
              variant="outline"
              size={size}
              rightIcon={<ArrowRightIcon />}
              onClick={handleClick}
            >
            <Button
              variant="outline"
              size={size}
              rightIcon={<ArrowRightIcon />}
              onClick={handleClick}
            >
              답변 하러가기
            </Button>
          </div>
        </div> */}

      <div>
        <h2 className={styles.listTopic}>누구에게 질문할까요?</h2>
        <div className={styles.sortWrapper}>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`${styles.dropdownButton} ${isDropdownOpen ? styles.activeBorder : ""}`}>
            {sort === "name" ? "이름순" : "최신순"}{" "}
            {isDropdownOpen ? <ArrowUpIcon className={styles.icon} /> : <ArrowDownIcon className={styles.icon} />}
          </button>

          {isDropdownOpen && (
            <ul className={`${styles.dropdownList} shadow-1`}>
              <li className={sort === "name" ? styles["selected"] : ""} onClick={() => handleSortChange("name")}>
                이름순
              </li>
              <li className={sort === "time" ? styles["selected"] : ""} onClick={() => handleSortChange("time")}>
                최신순
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className={styles.cardList}>
        {subjects.length === 0 && !isLoading ? (
          <p>질문 대상이 없습니다.</p>
        ) : (
          subjects.map((subject) => (
            <UserCard
              key={subject.id}
              subject={subject}
              imageUrl={subject.imageSource}
              onClick={() => handleCardClick(subject)}
            />
          ))
        )}
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePrevGroup} disabled={startPage === 1}>
          &lt;
        </button>

        {pageNumbers.map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? styles.active : ""}>
            {page}
          </button>
        ))}

        <button onClick={handleNextGroup} disabled={endPage === totalPages}>
          &gt;
        </button>
      </div>

      {error && <p className={styles["error-message"]}>{error}</p>}
    </div>
  );
}

export default QuestionListPage;
