import { Route, Routes } from "react-router-dom";
// css
import "./index.css";
import "./style/global.css";
import "./style/variables.css";
// component
import Header from "./components/Header/Header";
// page
import Main from "./features/main/MainPage";
import Post from "./features/post/PostPage";
import Answer from "./features/answer/AnswerPage";
import List from "./features/list/ListPage";

function App() {
  return (
    <>
      <div className="wrap">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/post" element={<Post />} />
            <Route path="/answer" element={<Answer />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
