"use client";

import React, { useState } from "react";

interface SearchboxProps {
  // Props에 대한 설명 추가
}

// useState의 제네릭 타입을 설정하여 타입 안정성을 확보합니다.
const Searchbox: React.FC<SearchboxProps> = () => {
  // 타입을 문자열 배열로 설정합니다.
  const [type, setType] = useState<string[]>([]); 
  // 선택된 타입의 초기값을 빈 문자열로 설정합니다.
  const [selectedType, setSelectedType] = useState<string>(""); 

  const fetchTypes = async () => {
    try {
      // 타입 가져오기 로직
      
    } catch (err) {
      // 에러 처리
    }
  };

  return <></>; // 나중에 JSX를 추가합니다.
};

export default Searchbox;
