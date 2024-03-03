"use client";
// 클라이언트 측 코드입니다. 사용자가 입력한 검색어로 아이템을 검색하고 표시합니다.

import React, {useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { openContext, selectContext } from "../context/styleContext";

export default function DisplayItems2() {
  // 검색어와 검색 결과를 관리하는 상태들입니다.
  const [inputValue, setInputValue] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // 선택된 아이템을
  const { selectedItemIndex } = useContext(selectContext);

  const fetchChatLogs = async () => {
    try {
      const response = await fetch(`/pmpForm/${selectedItemIndex}`);
      const data = await response.json();
      setChatLogs(data.chatLogs);
    } catch (error) {
      console.error("Error fetching chat logs:", error);
    }
  };

  // 아이템 유형을 가져오는 비동기 함수입니다.
  const fetchTypes = async () => {
    try {
      const response = await fetch("/fetchTypes");
      const data = await response.json();
      setTypes(data.types);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  // 검색을 처리하는 함수입니다.
  const handleSearch = async (input) => {
    try {
      const response = await fetch("/searchItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: input }), // 입력된 검색어를 서버로 전송합니다.
      });
      const data = await response.json();
      setSearchResults(data.items); // 검색 결과를 상태에 업데이트합니다.
    } catch (error) {
      console.error("Error searching items:", error);
    }
  };

  // 입력값 변경을 처리하는 함수입니다.
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력값을 상태에 업데이트합니다.
  };

  // 결과값 변경을 처리하는 함수입니다
  const handleResultChange = () => {
    setSearchResults(searchResults); // 검색 결과를 업데이트합니다. (이 부분은 필요하지 않아 보입니다.)
  };

  // 컴포넌트가 처음 마운트될 때 아이템 유형을 가져오는 함수를 호출합니다.
  useEffect(() => {
    fetchTypes();
    handleInputChange;
    handleResultChange;
    handleSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        type="text"
        style={{ color: "black" }}
        value={inputValue}
        onChange={handleInputChange}
      />
      {/* 검색 제출 버튼 */}
      <button onClick={() => handleSearch(inputValue)}>검색</button>
      {/* 타입 검색 버튼 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {types.map((type) => (
          <button key={type} onClick={() => setSelectedTypes(type)}>
            {type}
          </button>
        ))}
      </div>
      {/* 검색 결과 출력 */}
      <div onChange={handleResultChange}>
        {searchResults.map((item) => (
          <li key={item.id}>
            <p>type : {item.type}</p>
            <a href={item.url}>model : {item.model}</a>
          </li>
        ))}
      </div>
    </div>
  );
}