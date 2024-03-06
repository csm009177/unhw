"use client";

import React, { useEffect, useState } from "react";
import FetchTypes from "./searchBoxUI/FetchTypes";
import { typesContext, selectedTypesContext } from "../context/MainContext";

interface SearchboxProps {
  // Props에 대한 설명 추가
}

// useState의 제네릭 타입을 설정하여 타입 안정성 제공
const Searchbox: React.FC<SearchboxProps> = () => {
  // types을 문자열의 배열로 설정합니다.
  const [types, setTypes] = useState<string[]>([]);
  // selectedType의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedTypes, setSelectedTypes] = useState<string | null>(null);

  return (
    <typesContext.Provider value={{ types, setTypes }}>
      <selectedTypesContext.Provider value={{ selectedTypes, setSelectedTypes }}>
        <FetchTypes />
      </selectedTypesContext.Provider>
    </typesContext.Provider>
  );
};

export default Searchbox;
