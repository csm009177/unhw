"use client"; // 무엇을 뜻하는지 불분명한 표현입니다. 클라이언트 측 코드를 사용한다는 것을 나타내려면 주석을 적절히 수정하세요.

// 클라이언트 측 코드를 사용하여, 아이템을 검색하고 표시합니다.

import React, { useEffect, useState } from "react";

export default function DisplayItems() {
  // 검색어와 검색 결과를 관리하는 상태들입니다.
  const [inputValue, setInputValue] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  // 검색을 처리하는 함수입니다.
  const handleSearch = async () => {
    try {
      const response = await fetch("/searchItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: inputValue }), // 입력된 검색어를 서버로 전송합니다.
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

  const handleResultChange = (e) => {
    setSearchResults(searchResults); // 검색 결과를 업데이트합니다. (이 부분은 필요하지 않아 보입니다.)
  };

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 아이템 유형을 가져오는 함수를 호출합니다.
    handleInputChange
    handleResultChange
  }, []);

  return (
    <div style={{ display: "flex", flexDirection:"column" }}>
      <input
        type="text"
        style={{ color: "black" }}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>검색</button> {/* 검색 버튼 */}
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
