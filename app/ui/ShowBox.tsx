"use client";

import React, { useState } from "react";

import {
  selectedProductContext,
} from "../context/MainContext";

// useState의 제네릭 타입을 설정하여 타입 안정성 제공
const ShowBox: React.FC = () => {
  // types을 문자열의 배열로 설정합니다.
  const [types, setTypes] = useState<string[]>([]);
  // 선택된 Type의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedTypes, setSelectedTypes] = useState<string | null>(null);
  // brands을 문자열의 배열로 설정합니다.
  const [brands, setBrands] = useState<string[]>([]);
  // 선택된 Brands의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedBrands, setSelectedBrands] = useState<string | null>(null);
  // models을 문자열의 배열로 설정합니다.
  const [models, setModels] = useState<string[]>([]);
  // 선택된 Models의 타입을 문자열 또는 빈것을 허용 초기값을 빈 문자열로 설정합니다.
  const [selectedModels, setSelectedModels] = useState<string | null>(null);
  // modelDatas을 문자열의 배열로 설정합니다.
  const [modelDatas, setModelDatas] = useState<[]>([]); // ModelData 타입으로 변경
  // 선택된 Product의 배열을 배열로 설정합니다.
  const [selectedProduct, setSelectedProduct] = useState<[] | null>([]);

  return (
    <selectedProductContext.Provider
      value={{ selectedProduct, setSelectedProduct }}>
        
    </selectedProductContext.Provider>
  );
};

export default ShowBox;
