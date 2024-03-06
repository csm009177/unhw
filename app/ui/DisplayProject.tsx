"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { selectedProjectContext } from "../context/MainContext";

export default function DisplayProject() {
  const router = useRouter();
  const { selectedPjtIndex , setSelectedPjtIndex} = useContext(selectedProjectContext);

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
        width: "100%",
        height: "100%",
        backgroundColor: "#373737",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* 선택된 아이템이 있을 경우 메시지 표시 */}
      {selectedPjtIndex !== null && (
        <div style={{ width: "100%", height: "50%" }}>
          <p>Selected Projects : {selectedPjtIndex}</p>
        </div>
      )}
    </div>
  );
}
