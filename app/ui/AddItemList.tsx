"use client";

import { useEffect, useState } from "react";
import "../globals.css";

export default function AddItemList() {
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
    <div>
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
