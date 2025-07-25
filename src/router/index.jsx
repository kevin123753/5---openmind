import { Routes, Route } from "react-router-dom";
import QuestionListPage from "../features/list/ListPage";
import PostPage from "../features/post/PostPage";
import AnswerPage from "../features/answer/AnswerPage";
import MainPage from "../features/main/MainPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/list" element={<QuestionListPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/post/:id/answer" element={<AnswerPage />} />
      <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다</div>} />
    </Routes>
  );
}

export default Router;
