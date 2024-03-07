"use client";

import React, { useEffect, useState } from "react";

import {
  typesContext,
  selectedTypesContext,
  brandsContext,
  selectedBrandsContext,
} from "../context/MainContext";

import FetchTypes from "./searchBoxUI/FetchTypes";
import FetchBrand from "./searchBoxUI/FetchBrands";
import FetchModels from "./searchBoxUI/FetchModels";
import { modelsContext, selectedModelsContext } from "../context/MainContext";

interface SearchboxProps {
  // Props에 대한 설명 추가
}

// useState의 제네릭 타입을 설정하여 타입 안정성 제공
const Searchbox: React.FC<SearchboxProps> = () => {
  // types을 문자열의 배열로 설정합니다.
  const [types, setTypes] = useState<string[]>([]);
  // selectedType의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedTypes, setSelectedTypes] = useState<string | null>(null);
  // brands을 문자열의 배열로 설정합니다.
  const [brands, setBrands] = useState<string[]>([]);
  // selectedBrands의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedBrands, setSelectedBrands] = useState<string | null>(null);
  // models을 문자열의 배열로 설정합니다.
  const [models, setModels] = useState<string[]>([]);
  // selectedModels의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedModels, setSelectedModels] = useState<string | null>(null);

  return (
    <typesContext.Provider 
      value={{ types, setTypes }}>
      <selectedTypesContext.Provider 
        value={{ selectedTypes, setSelectedTypes }}>
        <brandsContext.Provider 
          value={{ brands, setBrands }}>
          <selectedBrandsContext.Provider 
            value={{ selectedBrands, setSelectedBrands }}>
            <modelsContext.Provider 
              value={{ models, setModels }}>
              <selectedModelsContext.Provider 
                value={{ selectedModels, setSelectedModels }}>
                <FetchTypes />
                <FetchBrand />
                <FetchModels />
              </selectedModelsContext.Provider>
            </modelsContext.Provider>
          </selectedBrandsContext.Provider>
        </brandsContext.Provider>
      </selectedTypesContext.Provider>
    </typesContext.Provider>
  );
};

export default Searchbox;
