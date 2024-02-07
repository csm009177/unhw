'use client'
// ToggleLeftVar 컴포넌트
import React, { useContext, useEffect, useState } from "react";
import "../globals.css";
import AddItemList from './AddItemList';
import { openContext } from "../context/styleContext";

export default function ToggleLeftVar() {
  const [url, setUrl] = useState(window.location.pathname);
  const { isOpen, setIsOpen } = useContext(openContext);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUrl("/lobby");
    }
  }, []);

  return (
    <div style={{display:"flex", flexDirection:"row", background:"#434343", height:"100%"}}>
      <AddItemList />
      <button onClick={toggleList} style={{backgroundColor: "#434343", fontSize:"2vw"}}>{isOpen ? "◀" : "▶"}</button>
    </div>
  );
}
