import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { deleteAllQuestionsBySubject } from "../../api/answerApi";

/****** utils ******/
import { setItem, getItem } from "../../utils/localStorage";

/****** hook ******/
import useQuestionList from "../../hooks/useQuestionList";

/****** dayjs 라이브러리 ******/
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

/****** css ******/
import "../../style/QnA.css";

/****** component ******/
import MessagesIcon from "../../components/Icon/MessagesIcon";
import Button from "../../components/Button/Button";
import ProfileContents from "./component/ProfileContents";
import QuestionList from "./component/QuestionList";
import NoQuestion from "./component/NoQuestion";

const AnswerPage = () => {
  const observerRef = useRef(null);
  const location = useLocation();

  // 메인에서 전달된 상태 or localStorage에서 subject 정보 가져오기
  const { id, name, imageSource } = location.state || {};
  const subjectId = id || getItem("mySubjectId");
  const username = name || getItem("username");

  // localStorage에서 subject 정보를 우선적으로 확인하여 userImage 상태 초기화
  const subjectFromStorage = getItem("subject");
  const [userImage, setUserImage] = useState(() => {
    // ✅ selectedSubject를 최우선으로 확인
    const selectedSubject = getItem("selectedSubject");
    if (selectedSubject?.imageSource) {
      console.log(
        "🔍 userImage 초기화: selectedSubject.imageSource 사용",
        selectedSubject.imageSource
      );
      return selectedSubject.imageSource;
    }
    // localStorage의 subject.imageSource를 다음으로 사용
    if (subjectFromStorage?.imageSource) {
      console.log(
        "🔍 userImage 초기화: localStorage subject.imageSource 사용",
        subjectFromStorage.imageSource
      );
      return subjectFromStorage.imageSource;
    }
    // 그 다음 location.state의 imageSource
    if (imageSource) {
      console.log(
        "🔍 userImage 초기화: location.state imageSource 사용",
        imageSource
      );
      return imageSource;
    }
    // 마지막으로 개별 키
    const fallbackImage = getItem("userImage");
    console.log("🔍 userImage 초기화: 개별 키 사용", fallbackImage);
    return fallbackImage;
  });

  // 전달된 정보 localStorage 저장
  useEffect(() => {
    if (id && name) {
      setItem("mySubjectId", id);
      setItem("username", name);
      setItem("userImage", imageSource);
    }
  }, [id, name, imageSource]);

  // ✅ selectedSubject 변경 감지를 위한 useEffect 추가
  useEffect(() => {
    const handleStorageChange = () => {
      const selectedSubject = getItem("selectedSubject");
      if (selectedSubject && selectedSubject.id === subjectId) {
        setUserImage(selectedSubject.imageSource || "");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [subjectId]);

  // 리스트 받아옴
  const { queList, setQueList, refetch } = useQuestionList(subjectId);
  if (!subjectId) {
    return null;
  }

  // 데이터 업데이트 함수
  const handleDataUpdate = (updatedData) => {
    if (updatedData) {
      // 즉시 UI 업데이트
      setQueList(updatedData);
    } else {
      // 기존 방식: 데이터 다시 불러오기
      refetch();
    }
  };

  // 이미지 변경 핸들러
  const handleImageChange = (newImageUrl) => {
    console.log("🔄 이미지 변경 시작:", newImageUrl);

    // userImage 상태 업데이트
    setUserImage(newImageUrl);
    console.log("✅ userImage 상태 업데이트 완료");

    // localStorage에서 subject 정보 가져오기
    let subject = getItem("subject");
    console.log("🔍 현재 localStorage subject:", subject);

    if (subject) {
      // 기존 subject 객체가 있으면 imageSource만 업데이트
      subject.imageSource = newImageUrl;
      setItem("subject", subject);
      // ✅ 요구사항: selectedSubject로도 저장
      setItem("selectedSubject", subject);
      console.log(
        "✅ 프로필 이미지가 localStorage에 저장되었습니다:",
        newImageUrl
      );
    } else {
      // subject 객체가 없으면 새로 생성
      subject = {
        id: subjectId,
        name: username,
        imageSource: newImageUrl,
      };
      setItem("subject", subject);
      // ✅ 요구사항: selectedSubject로도 저장
      setItem("selectedSubject", subject);
      console.log(
        "✅ 새로운 subject 객체가 생성되고 이미지가 저장되었습니다:",
        newImageUrl
      );
    }

    // 기존 방식과의 호환성을 위해 개별 키도 업데이트
    setItem("userImage", newImageUrl);
    console.log("✅ 개별 키 userImage도 업데이트 완료");
  };

  const handleClick = async (questionId) => {
    try {
      const question = queList.find((item) => item.id === questionId);
      if (!question) throw new Error("질문 없음");
      setItem("questionId", question.id);
    } catch (err) {
      console.error("질문 조회 실패", err.message);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("모든 질문을 삭제하시겠습니까?")) return;

    try {
      console.log("삭제 대상 subjectId:", subjectId);
      await deleteAllQuestionsBySubject(subjectId);
      setQueList([]); // 🔄 질문 리스트 초기화
      window.scrollTo(0, 0); // 🔄 스크롤 최상단 이동으로 옵저버 재발동 유도
      alert("질문이 모두 삭제되었습니다.");
    } catch (err) {
      console.error("질문 삭제 실패", err);
      alert(err.message || "삭제 중 오류 발생");
    }
  };

  const questionListProps = {
    data: queList,
    img: userImage,
    userName: username,
    dayjs,
    observerRef,
    handleClick,
    onDataUpdate: handleDataUpdate,
  };

  return (
    <div className="inner qAPage">
      <ProfileContents
        img={userImage}
        userName={username}
        location={location}
        onImageChange={handleImageChange}
      />
      <div className="answerBtnContents">
        <Button
          variant="round"
          size="small"
          className="shadow-2 removeBtn"
          onClick={handleDeleteAll}
        >
          삭제하기
        </Button>
      </div>
      <div className="container">
        <h3>
          <MessagesIcon />
          {queList.length > 0
            ? `${queList.length}개의 질문이 있습니다`
            : "아직 질문이 없습니다"}
        </h3>
        {queList.length > 0 ? (
          <QuestionList {...questionListProps} />
        ) : (
          <NoQuestion />
        )}
      </div>
    </div>
  );
};

export default AnswerPage;
