'use client'

import React, { useState, useEffect } from "react";
import "../globals.css";
import ToggleLeftVar from '../ui/ToggleLeftVar';
import AddItemList from '../ui/AddItemList';

export default function Home() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  
  return (
    <div className="Left-var">
      <ToggleLeftVar/>

    </div>
  );
}


