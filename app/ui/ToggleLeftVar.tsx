import { useContext, useEffect, useState } from "react";
import "../globals.css";
import AddItemList from './AddItemList';
import { styleContext } from "../context/styleContext";

export default function ToggleLeftVar() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [items, setItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const { isOpen, setIsOpen } = useContext(styleContext);

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
    <div 
      style={{display:"flex", flexDirection:"row", background:"#434343", height:"100%"}}>
        <AddItemList isOpen={isOpen} setIsOpen={setIsOpen}/>
      <button onClick={toggleList} style={{backgroundColor: "#434343", fontSize:"2vw"}}>{isOpen ? "◀" : "▶"}</button>
    </div>
  );
}
