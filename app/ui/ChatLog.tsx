'use client'

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { openContext, selectContext } from "../context/styleContext";

export default function MainSelectShow() {
  const router = useRouter();
  const { selectedItemIndex } = useContext(selectContext);
  const [pmpContents, setPmpContents] = useState("");
  const [chatLogs, setChatLogs] = useState([]);

  useEffect(() => {
    if (selectedItemIndex !== null) {
      const href = `/item${selectedItemIndex}`;
      router.push(href);
    }
  }, [selectedItemIndex, router]);

  useEffect(() => {
    // selectedItemIndex가 변경될 때마다 채팅 내용을 불러옴
    if (selectedItemIndex !== null) {
      fetchChatLogs();
    }
  }, [selectedItemIndex]);

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
    <>
      {/* 채팅 입력 폼 */}
      <form onSubmit={handleChatSubmit} style={{ width: "100%" }}>
        <input
          style={{ width: "90%", color: "black" }}
          type="text"
          value={pmpContents}
          onChange={(e) => setPmpContents(e.target.value)}
        />
        <button type="submit" style={{ width: "10%", textAlign: "center" }}>
          submit
        </button>
        {/* 채팅 내용 출력 */}
        <div style={{ width: "100%", overflowY: "scroll", maxHeight: "5%" }}>
          {chatLogs.map((log, index) => (
            <p key={index}>{log.pmpContents}</p>
          ))}
        </div>
        {/* <DisplayItems/> */}
      </form>
    </>
  );
}
