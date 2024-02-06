import { useEffect, useState } from "react";
import "./App.css";
import Lobby from "./Lobby";
import Main from "./pages/Main";
import Login from "./ui/login";
import SignUp from "./ui/signup";

function App() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴

  useEffect(() => {
    // 로그인 토큰이 없으면 "/lobby"로 URL 경로 설정
    const token = localStorage.getItem("token");
    if (!token) {
      setUrl("/lobby");
    }
  }, []); // 한 번만 실행되도록 설정

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
