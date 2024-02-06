import { useEffect, useState } from "react";
import '../App.css';

function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // 로그인 토큰이 없으면 "/lobby"로 URL 경로 설정
    const token = localStorage.getItem("token");
    if (!token) {
      setUrl("/lobby");
    }
  }, []); // 한 번만 실행되도록 설정

  return (
    <div className="Main">
      {isOpen && (
        <div className="Left-var">
          <ul>
            <p>unhw</p>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      )}
      <button onClick={toggleList}>{isOpen ? '◀' : '▶'}</button>
      <div className="Right-Cont" style={{ width: isOpen ? "80%" : "96%" }}>
        {isOpen ? "open" : "close"}
      </div>
    </div>
  );
}

export default Main;
