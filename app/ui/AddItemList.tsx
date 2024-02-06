"use client";

import { useEffect, useState } from "react";
import "../globals.css";

export default function ToggleLeftVar() {
  const [isOpen, setIsOpen] = useState(true);
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [items, setItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <ul>
      <p onClick={addItem}>unhw</p>
      {items.map((item, index) => (
        <li key={index} onClick={() => handleItemClick(index)}>
          {item}
        </li>
      ))}
    </ul>
  );
}
