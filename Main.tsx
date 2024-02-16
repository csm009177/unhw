import { useEffect, useState } from "react";
import "../App.css";

function Main() {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [inputValue, setInputValue] = useState(""); // 입력한 값 상태 추가
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

  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const handleSubmit = () => {
    // 입력된 값이 비어있으면 제출하지 않음
    if (!inputValue.trim()) return;

    // 새로운 div 태그 생성하여 입력된 값 기록
    const newDiv = document.createElement("div");
    newDiv.textContent = inputValue;
    document.querySelector(".Right-Cont-board").appendChild(newDiv);

    // 입력된 값을 초기화
    setInputValue("");
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
            <div
              style={{
                marginTop: "1%",
                marginLeft: "1%",
                display: "flex",
                flexDirection: "row",
                width: "99%",
                height: "99%",
              }}
            >
              <input
                style={{
                  width: "79%",
                  height: "5vh",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // 입력값을 업데이트
              ></input>
              <button onClick={handleSubmit}>Submit</button>{" "}
              {/* 입력값 제출 버튼 */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
