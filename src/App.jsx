import ButtonTest from "./components/Button/ButtonTest";
import InputTest from "./components/Input/InputTest";
import "./style/global.css";
import "./style/variables.css";

function App() {
  return (
    <div>
      <h1 style={{ padding: "50px 50px 0px 50px" }}>공통 컴포넌트 테스트</h1>
      <div style={{ width: "440px" }}>
        <InputTest />
        <ButtonTest />
      </div>
    </div>
  );
}

export default App;
