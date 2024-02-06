import { useEffect, useState } from "react";
import "../globals.css";
import AddItemList from './AddItemList';

export default function ToggleLeftVar() {
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

  return (
    <div className="flex flex-row h-screen">
      <div
        className={`flex flex-col ${isOpen ? "open" : "closed"}`}
        style={{ width: isOpen ? "100%" : "0%" , height:"100%" }}
      >
        <AddItemList/>
      </div>
      <button onClick={toggleList}>{isOpen ? "◀" : "▶"}</button>
    </div>
  );
}
