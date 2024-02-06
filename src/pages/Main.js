import { useEffect, useState } from "react";
import "../App.css";

function Main() {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [inputValue, setInputValue] = useState(""); // input 값의 상태

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

  const handleSubmit = () => {
    if (!inputValue) return; // 입력값이 없으면 아무 동작도 하지 않음

    const newItem = inputValue; // 입력된 값으로 새로운 아이템 생성
    setItems([...items, newItem]);
    setInputValue(""); // 입력값 초기화
  };

  return (
    <div className="Main">
      <div
        className={`Left-var ${isOpen ? "open" : "closed"}`}
        style={{ width: isOpen ? "20%" : "0%" }}
      >
        <ul>
          <p onClick={addItem}>unhw</p>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleItemClick(index + 1)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={toggleList}>{isOpen ? "◀" : "▶"}</button>
      <div className="Right-Cont" style={{ width: isOpen ? "80%" : "100%" }}>
        {selectedItemIndex !== null && (
          <div>
            <p>Selected Item : {selectedItemIndex}</p>
          </div>
        )}
        {selectedItemIndex !== null && (
          <div className="Right-Cont-board">
            {items.map((item2, index2) => (
              <li key={index2}>{item2}</li>
            ))}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              style={{
                width: "auto",
                height: "10vh",
              }}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
