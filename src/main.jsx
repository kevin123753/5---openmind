import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(kakaoKey);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
