"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { openContext, selectContext } from "../context/styleContext";
import DisplayItems from "./DisplayItems4";

export default function MainSelectShow() {
  const router = useRouter();
  const { selectedItemIndex } = useContext(selectContext);
  const { isOpen } = useContext(openContext);
  const [pmpContents, setPmpContents] = useState("");
  const [chatLogs, setChatLogs] = useState([]);

  useEffect(() => {
    if (selectedItemIndex !== null) {
      const href = `/item${selectedItemIndex}`;
      router.push(href);
    }
  }, [selectedItemIndex, router]);

  // 채팅 내용 불러오기 함수
  const fetchChatLogs = async () => {
    try {
      const response = await fetch(`/pmpForm/${selectedItemIndex}`);
      const data = await response.json();
      setChatLogs(data.chatLogs);
    } catch (error) {
      console.error("Error fetching chat logs:", error);
    }
  };

  useEffect(() => {
    // selectedItemIndex가 변경될 때마다 채팅 내용을 불러옴
    if (selectedItemIndex !== null) {
      fetchChatLogs();
    }
  }, [selectedItemIndex]);

  // 채팅 입력 제출 함수
  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/pmpForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedItemIndex, pmpContents }),
      });
      console.log("Chat submitted successfully!");
      // 제출 후 채팅 내용 다시 불러오기
      fetchChatLogs();
      // 입력창 초기화
      setPmpContents("");
    } catch (error) {
      console.error("Error submitting chat:", error);
    }
  };

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
          {/* 채팅 입력 폼 */}
          <form onSubmit={handleChatSubmit} style={{width:"100%"}}>
            <input
              style={{ width: "90%", color: "black" }}
              type="text"
              value={pmpContents}
              onChange={(e) => setPmpContents(e.target.value)}
            />
            <button type="submit" style={{width:"10%", textAlign:"center"}}>submit</button>
          {/* 채팅 내용 출력 */}
          <div style={{ width: "100%", overflowY:"scroll", maxHeight:"5%" }}>
            {chatLogs.map((log, index) => (
              <p key={index}>{log.pmpContents}</p>
              ))}
          </div>
              <DisplayItems/>
          </form>
        </div>
      )}
    </div>
  );
}
