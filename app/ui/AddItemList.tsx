"use client";

import { useState, useContext } from "react";
import "../globals.css";
import { openContext } from "../context/styleContext";

export default function AddItemList() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [items, setItems] = useState([]);
  const { isOpen, setIsOpen } = useContext(openContext);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <div style={{ width: isOpen ? "100%" : "0%", color:"#FFFFFF" }}>
      <p onClick={addItem}>unhw</p>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
