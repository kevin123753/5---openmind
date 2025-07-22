import { useState, useEffect } from "react";
import { getItem } from "../utils/localStorage";

const usePostUserInfo = ({ name, id, imageSource }) => {
  // 현재상태 저장
  const [userName, setUserName] = useState(name || "");
  const [userId, setUserId] = useState(id || "");
  const [img, setImg] = useState(imageSource || "");

  useEffect(() => {
    if (!userId) {
      const storedName = localStorage.getItem("name");
      const storedId = localStorage.getItem("mySubjectId");
      const storedImg = localStorage.getItem("imageSource");

      if (storedId) {
        setUserName(storedName || "");
        setUserId(storedId);
        setImg(storedImg || "");
      }
    } else {
      // ✅ selectedSubject에서 최신 이미지 정보 가져오기
      const selectedSubject = getItem("selectedSubject");
      if (selectedSubject && selectedSubject.id === userId) {
        setImg(selectedSubject.imageSource || imageSource || "");
        setUserName(selectedSubject.name || name || "");
      }
    }
  }, [userId, name, imageSource]);

  // ✅ selectedSubject 변경 감지를 위한 useEffect 추가
  useEffect(() => {
    const handleStorageChange = () => {
      const selectedSubject = getItem("selectedSubject");
      if (selectedSubject && selectedSubject.id === userId) {
        setImg(selectedSubject.imageSource || "");
        setUserName(selectedSubject.name || "");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userId]);

  return { userId, userName, img, setUserId, setUserName, setImg };
};

export default usePostUserInfo;
