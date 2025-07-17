import { useState, useEffect } from "react";

export default function useResponsiveSize() {
  const getSize = () => {
    const width = window.innerWidth;
    return width <= 767 ? "small" : "medium";
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
