import { useEffect, useState, useRef, useCallback } from "react";
import { getQuestions } from "../postService";

const useInifiniteScroll = (subjectId, limit = 8) => {
  const [queList, setQueList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const loadedPagesRef = useRef(new Set());

  const fetchScroll = useCallback(
    async (currentPage) => {
      if (loadedPagesRef.current.has(currentPage)) return;

      setLoading(true);
      const offset = (currentPage - 1) * limit;

      try {
        const data = await getQuestions(subjectId, limit, offset);
        console.log(data);
        setQueList((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const newItems = data.results.filter((item) => !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
        setTotalCount(data.count);
        loadedPagesRef.current.add(currentPage);
        setHasNextPage(data.results.length === limit);
      } catch (error) {
        console.error("무한스크롤 에러", error);
      } finally {
        setLoading(false);
      }
    },
    [subjectId, limit]
  );

  useEffect(() => {
    if (subjectId) {
      fetchScroll(page);
    }
  }, [subjectId, page, fetchScroll]);

  const loadMore = () => {
    if (hasNextPage && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    queList,
    loading,
    hasNextPage,
    totalCount,
    loadMore,
    setQueList,
  };
};

export default useInifiniteScroll;
