"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import {
  openContext,
  selectedProjectContext,
  selectedProductContext,
} from "../context/MainContext";
import Searchbox from "./Searchbox";
import ShowBox from "./ShowBox";

export default function ProjectShow() {
  const router = useRouter();
  const { isOpen } = useContext(openContext);
  // 선택된 프로젝트의 인덱스를 변경합니다.
  const { selectedPjtIndex } = useContext(selectedProjectContext);
  // 선택된 Product의 배열을 배열로 설정합니다.
  const [selectedProduct, setSelectedProduct] = useState<[] | null>([]);

  useEffect(() => {
    if (selectedPjtIndex !== null) {
      const href = `/pjt${selectedPjtIndex}`;
      router.push(href);
    }
  }, [selectedPjtIndex, router]);

  return (
    <div
      className="Main-RightCont"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#373737",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* 선택된 아이템이 있을 경우 메시지 표시 */}
      {selectedPjtIndex !== null && (
        <div
          style={{
            width: "90%",
            height: "90%",
            backgroundColor: "#434343",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Selected Projects : {selectedPjtIndex}</p>
          <br />
          <selectedProductContext.Provider
            value={{ selectedProduct, setSelectedProduct }}
          >
            <div
              style={{
                width: "90%",
                height: "65%",
                backgroundColor: "#373737",
              }}
            >
              <Searchbox />
            </div>
            <br />
            <div style={{ width: "90%", height: "20%", backgroundColor: "#373737", }}>
              <ShowBox />
            </div>
          </selectedProductContext.Provider>
        </div>
      )}
    </div>
  );
}
