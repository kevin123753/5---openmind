import { useState, useEffect } from "react";

export default function useResponsiveSize() {
  const getSize = () => {
    const width = window.innerWidth;
    if (width <= 767) return "small"; // 모바일
    if (width <= 1024) return "medium"; // 태블릿
    return "large"; // PC
  };

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
