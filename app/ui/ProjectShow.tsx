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
  const [selectedProduct, setSelectedProduct] = useState<[]|null>([]);

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
        width: '100vw',
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
        <div style={{ width: "90%", height: "90%" }}>
          <p>Selected Projects : {selectedPjtIndex}</p>
          <selectedProductContext.Provider 
            value={{selectedProduct, setSelectedProduct}}>
            <div style = {{width:'100%', height:'45%'}}>
              <Searchbox />
            </div>
            <div style = {{width:'100%', height:'45%'}}>
              <ShowBox />
            </div>
          </selectedProductContext.Provider>
        </div>
      )}
    </div>
  );
}
