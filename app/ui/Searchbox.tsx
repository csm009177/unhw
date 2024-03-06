"use client";

import React, { useEffect, useState } from "react";

interface SearchboxProps {
  // Props에 대한 설명 추가
}

// useState의 제네릭 타입을 설정하여 타입 안정성 제공
const Searchbox: React.FC<SearchboxProps> = () => {
  // types을 문자열의 배열로 설정합니다.
  const [types, setTypes] = useState<string[]>([]);
  // selectedType의 타입을 넘버또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const fetchTypes = async () => {
    try {
      const response = await fetch("/fetchTypes");
      const data = await response.json();
      setTypes(data.types);
    } catch (err) {
      console.error("Error fetching types:", err);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

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
        {types.map((type, index) => (
          <button key={index} onClick={() => setSelectedType(index)}>
            {type}
          </button>
        ))}
      </div>
    </>
  );
};

export default Searchbox;
