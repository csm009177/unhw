"use client";

import React, { useEffect, useState } from "react";

interface SearchboxProps {
  // Props에 대한 설명 추가
}

// useState의 제네릭 타입을 설정하여 타입 안정성을 확보합니다.
const Searchbox: React.FC<SearchboxProps> = () => {
  // 타입을 문자열 배열로 설정합니다.
  const [types, setTypes] = useState<string[]>([]);
  // 선택된 타입의 초기값을 빈 문자열로 설정합니다.
  const [selectedType, setSelectedType] = useState<string>("");

  const fetchTypes = async () => {
    try {
      const response = await fetch("/fetchTypes");
      console.log(response)
      const data = await response.json();
      setTypes(data.types);
    } catch (err) {
      console.error("Error fetching types:", err);
    }
  };

  useEffect(() => {
    fetchTypes();
    console.log(types);
  }, [types]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        types :
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </>
  );
};

export default Searchbox;
