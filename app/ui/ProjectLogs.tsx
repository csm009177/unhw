'use client'

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { openContext, selectContext } from "../context/styleContext";

export default function ProjectLogs() {
  const router = useRouter();
  const { selectedPjtIndex } = useContext(selectContext);
  const [pjtContents, setPjtContents] = useState("");
  const [pjtLogs, setPjtLogs] = useState([]);

  useEffect(() => {
    if (selectedPjtIndex !== null) {
      const href = `/pjt${selectedPjtIndex}`;
      router.push(href);
    }
  }, [selectedPjtIndex, router]);

  useEffect(() => {
    // selectedItemIndex가 변경될 때마다 채팅 내용을 불러옴
    if (selectedPjtIndex !== null) {
      fetchChatLogs();
    }
  }, [selectedPjtIndex]);

  // 채팅 내용 불러오기 함수
  const fetchChatLogs = async () => {
    try {
      const response = await fetch(`/pjtForm/${selectedPjtIndex}`);
      const data = await response.json();
      setPjtLogs(data.chatLogs);
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
        body: JSON.stringify({ selectedPjtIndex, pjtContents }),
      });
      console.log("Chat submitted successfully!");
      // 제출 후 채팅 내용 다시 불러오기
      fetchChatLogs();
      // 입력창 초기화
      setPjtContents("");
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
          value={pjtContents}
          onChange={(e) => setPjtContents(e.target.value)}
        />
        <button type="submit" style={{ width: "10%", textAlign: "center" }}>
          submit
        </button>
        {/* 채팅 내용 출력 */}
        <div style={{ width: "100%", overflowY: "scroll", maxHeight: "5%" }}>
          {pjtLogs.map((log, index) => (
            <p key={index}>{log.pjtContents}</p>
          ))}
        </div>
        {/* <DisplayItems/> */}
      </form>
    </>
  );
}
