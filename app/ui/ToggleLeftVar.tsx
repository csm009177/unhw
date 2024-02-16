"use client";

import { useContext, useEffect, useState } from "react";
import "../globals.css";
import AddItemList from "./AddItemList";
import { openContext, selectContext } from "../context/styleContext";
import { usePathname, useRouter } from "next/navigation";

export default function ToggleLeftVar() {
  const [url, setUrl] = useState(""); // 현재 URL 경로를 가져오는 상태
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
    // 클라이언트 환경에서만 window 객체를 참조하도록 설정
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []); // 한 번만 실행되도록 설정

  return (
    <div
      className="Main-LeftVar"
      style={{
        width: isOpen ? "20%" : "2%",
        display: "flex",
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
          width: "100%",
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
