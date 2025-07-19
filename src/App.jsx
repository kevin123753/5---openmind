import { Routes, Route } from "react-router-dom";
import "./index.css";
import "./app.css";
import "./style/global.css";
import "./style/variables.css";

import Header from "./components/Header/Header";
import MainPage from "./features/main/MainPage";
import QuestionListPage from "./features/list/ListPage";
import PostPage from "./features/post/PostPage";
import AnswerPage from "./features/answer/AnswerPage";

function App() {
  return (
    <>
      <div className="wrap">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/list" element={<QuestionListPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/post/:questionId/answer" element={<AnswerPage />} />
            <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다</div>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
