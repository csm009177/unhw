"use client";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { openContext, selectContext } from "../context/styleContext";

export default function MainSelectShow() {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedItemIndex } = useContext(selectContext);
  const { isOpen, setIsOpen } = useContext(openContext);
  const [pmpContents, setPmpContents] = useState("");

  useEffect(() => {
    if (selectedItemIndex !== null) {
      const href = `/item${selectedItemIndex}`; // 동적 URL 생성
      router.push(href); // 해당 동적 URL로 페이지를 라우팅합니다.
    }
  }, [selectedItemIndex, router]);

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 선택된 아이템의 인덱스와 채팅 내용을 함께 전송
      await fetch('/pmpForm', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedItemIndex, pmpContents }),
      });
      console.log("Chat submitted successfully!");
    } catch (error) {
      console.error("Error submitting chat:", error);
    }
  };
  

  return (
    <div
      className="Main-RightCont"
      style={{
        width: isOpen ? "80%" : "98%",
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
        <div style={{ width:"100%",  height: "100%" }}>
          <p>Selected Item : {selectedItemIndex}</p>
          <form onSubmit={handleChatSubmit}>
        <input
          type="text"
          value={pmpContents}
          onChange={(e) => setPmpContents(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "50%",
            }}
          >
            
          </div>
        </div>
      )}
    </div>
  );
}
