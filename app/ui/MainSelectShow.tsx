"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { openContext, selectContext } from "../context/styleContext";
import DisplayItems from "./DisplayItems";
import DisplayItems2 from "./DisplayItems2";
import ChatLog from "./ChatLog";

export default function MainSelectShow() {
  const router = useRouter();
  const { selectedItemIndex } = useContext(selectContext);

  useEffect(() => {
    if (selectedItemIndex !== null) {
      const href = `/item${selectedItemIndex}`;
      router.push(href);
    }
  }, [selectedItemIndex, router]);

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
      {selectedItemIndex !== null && (
        <div style={{ width: "100%", height: "50%" }}>
          <p>Selected Item : {selectedItemIndex}</p>
          {/* <DisplayItems /> */}
          <DisplayItems2 />
          {/* <ChatLog/> */}
        </div>
      )}
    </div>
  );
}
