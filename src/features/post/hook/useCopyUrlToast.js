import { useState } from "react";

const useCopyUrlToast = () => {
  const [toast, setToast] = useState(false);

  // 현재 url 복사
  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setToast(true);
      setTimeout(() => setToast(false), 500);
    } catch (err) {
      alert("url 복사 실패");
      console.error("복사 실패", err);
    }
  };

  return { toast, copyUrl };
};

export default useCopyUrlToast;
