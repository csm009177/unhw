import { useEffect, useState } from 'react';
import './App.css';
import Lobby from './Lobby';
import Main from './Main';

function App() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴

  useEffect(() => {
    // URL 경로가 "/"일 때만 setUrl 함수를 호출하여 상태를 변경
    if (window.location.pathname === "/login") {
      setUrl("/login");
    }
  }, []); // 의존성 배열을 비워두어 한 번만 실행되도록 설정

  return (
    <div className="App">
      {/* url이 "/"인 경우에만 LoginForm 컴포넌트를 렌더링 */}
      {url === "/login" && <Lobby />}
      {url === "/" && <Main/>}
    </div>
  );
}

export default App;
