"use client";

import {
  selectedTypesContext,
  selectedBrandsContext,
  selectedModelsContext,
  modelDatasContext,
} from "@/app/context/MainContext";
import React, { useContext, useEffect, useState } from "react";

const FetchModelDatas: React.FC = () => {
  const {modelDatas, setModelDatas} = useContext(modelDatasContext)

  const { selectedTypes, setSelectedTypes } = useContext(selectedTypesContext);
  const { selectedBrands, setSelectedBrands } = useContext(selectedBrandsContext);
  const { selectedModels, setSelectedModels } = useContext(selectedModelsContext)

  const fetchModelDatas = async (selectedTypes: string, selectedBrands:string, selectedModels:string) => {
    try {
      const response = await fetch(`/fetchModelDatas?type=${selectedTypes}&brand=${selectedBrands}&model=${selectedModels}`);
      const data = await response.json();
      setModelDatas(data.modelDatas); // models 배열 설정
    } catch (error) {
      console.error("모델을 가져오는 도중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (selectedTypes && selectedBrands && selectedModels) {
      fetchModelDatas(selectedTypes, selectedBrands, selectedModels);
    }
  }, [selectedTypes, selectedBrands, selectedModels]);

  return (
    <div>
    {modelDatas ? (
      modelDatas.map((info, index) => (
        <button 
        key={index} onClick={() => handleClickModel(info.model)}>
          <ul>
            <li>Type: {info.type}</li>
            <li>Part Number: {info.part_number}</li>
            <li>Brand: {info.brand}</li>
            <li>Model: {info.model}</li>
            <li>Rank: {info.rank}</li>
            <li>Benchmark: {info.benchmark}</li>
            <li>Samples: {info.samples}</li>
            <li>
              <a href={info.url}>Link Button</a>
            </li>
          </ul>
        </button>
      ))
    ) : (
      <p>No model information available.</p>
    )}
  </div>
  );
};

export default FetchModelDatas;
