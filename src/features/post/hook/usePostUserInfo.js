import { useState, useEffect } from "react";

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
    }
  }, []);
  return { userId, userName, img, setUserId, setUserName, setImg };
};

export default usePostUserInfo;
