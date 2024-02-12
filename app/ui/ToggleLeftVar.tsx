"use client";

import { useContext, useEffect, useState } from "react";
import "../globals.css";
import AddItemList from "./AddItemList";
import { openContext, selectContext } from "../context/styleContext";
import { usePathname, useRouter } from "next/navigation";

export default function ToggleLeftVar() {
  const [url, setUrl] = useState(window.location.href); // 현재 URL 경로를 가져옴
  const router = useRouter();
  const pathname = usePathname();
  const [items, setItems] = useState([]);
  const { isOpen, setIsOpen } = useContext(openContext);
  const { selectedItemIndex, setSelectedItemIndex } = useContext(selectContext);
  const href = `/item${selectedItemIndex}`; // 동적 URL 생성

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
      className="Main-LeftVar"
      style={{
        width: isOpen ? "20%" : "2%",
        display:"flex",
        // justifyContent:"center",
        height: "100%",
        backgroundColor: "#434343",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          background: "#434343",
          width:"100%",
          height: "100%",
        }}
      >
        <AddItemList isOpen={isOpen} setIsOpen={setIsOpen} />
        <button
          onClick={toggleList}
          style={{ backgroundColor: "#434343", fontSize: "2vw" }}
        >
          {isOpen ? "◀" : "▶"}
        </button>
      </div>
    </div>
  );
}
