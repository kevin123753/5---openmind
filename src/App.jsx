import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionListPage from "./pages/QuestionListPage";
import AnswerPage from "./pages/AnswerPage";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<QuestionListPage />} />
        <Route path="/post/:id/answer" element={<AnswerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
