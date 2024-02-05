import { useEffect, useState } from "react";
import "./App.css";
import Lobby from "./Lobby";
import Main from "./pages/Main";
import Login from "./ui/login";
import SignUp from "./ui/signup";

function App() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴

  useEffect(() => {
    // URL 경로가 "/lobby"일 때만 setUrl 함수를 호출하여 상태를 변경
    if (window.location.pathname === "/lobby") {
      setUrl("/lobby");
    }
  }, []); // 의존성 배열을 비워두어 한 번만 실행되도록 설정

  return (
    <div className="App">
      {url === "/" && <Main />}
      {url === "/lobby" && <Lobby />}
      {url === "/login" && <Login />}
      {url === "/signup" && <SignUp />}
    </div>
  );
}

export default App;
