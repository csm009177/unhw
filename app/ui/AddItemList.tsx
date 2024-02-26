"use client";

import { useState, useContext } from "react";
import "../globals.css";
import { openContext,selectContext } from "../context/styleContext";

export default function AddItemList() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [pjts, setPjts] = useState([]);
  const { isOpen, setIsOpen } = useContext(openContext);
  const { selectedPjtIndex, setSelectedPjtIndex } = useContext(selectContext);

  const addItem = () => {
    const newPjts = `Item ${pjts.length}`;
    setPjts([...pjts, newPjts]);
  };

  const handleItemClick = (index) => {
    setSelectedPjtIndex(index);
  };

  return (
    <div style={{ width: isOpen ? "100%" : "0%", color:"#FFFFFF" }}>
      <p onClick={addItem} style={{fontSize:"5vh"}}>unhw</p>
      <ul>
        <br />
        {pjts.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
