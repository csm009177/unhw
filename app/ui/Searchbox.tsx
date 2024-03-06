"use client";

import React, { useEffect, useState } from "react";

import {
  typesContext,
  selectedTypesContext,
  brandsContext,
  selectedBrandsContext,
} from "../context/MainContext";

import FetchTypes from "./searchBoxUI/FetchTypes";
import BrandTypes from "./searchBoxUI/FetchBrands";

interface SearchboxProps {
  // Props에 대한 설명 추가
}

// useState의 제네릭 타입을 설정하여 타입 안정성 제공
const Searchbox: React.FC<SearchboxProps> = () => {
  // types을 문자열의 배열로 설정합니다.
  const [types, setTypes] = useState<string[]>([]);
  // selectedType의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedTypes, setSelectedTypes] = useState<string | null>(null);
  // types을 문자열의 배열로 설정합니다.
  const [brands, setBrands] = useState<string[]>([]);
  // selectedType의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedBrands, setSelectedBrands] = useState<string | null>(null);

  return (
    <typesContext.Provider value={{ types, setTypes }}>
      <selectedTypesContext.Provider value={{ selectedTypes, setSelectedTypes }}>
        <brandsContext.Provider value={{brands, setBrands}}>
          <selectedBrandsContext.Provider value={{ selectedBrands, setSelectedBrands }}>
            <FetchTypes />
            <BrandTypes />
          </selectedBrandsContext.Provider>
        </brandsContext.Provider>
      </selectedTypesContext.Provider>
    </typesContext.Provider>
  );
};

export default Searchbox;
