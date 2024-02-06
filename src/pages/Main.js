import { useEffect, useState } from "react";
import "../App.css";

function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [items, setItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

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

  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <div className="Main">
      <div
        className={`Left-var ${isOpen ? "open" : "closed"}`}
        style={{ width: isOpen ? "20vw" : "0" }}
      >
        <ul>
          <p onClick={addItem}>unhw</p>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(index)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={toggleList}>{isOpen ? "◀" : "▶"}</button>
      <div className="Right-Cont" style={{ width: isOpen ? "80%" : "96%" }}>
        {isOpen && selectedItemIndex !== null && (
          <p>Selected Item Index: {selectedItemIndex}</p>
        )}
      </div>
    </div>
  );
}

export default Main;
