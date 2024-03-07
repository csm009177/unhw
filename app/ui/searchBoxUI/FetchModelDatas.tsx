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

  const fetchModelDatas = async (selectedTypes: string, selectedBrands:string) => {
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
      fetchModelDatas(selectedTypes, selectedBrands);
    }
  }, [selectedTypes, selectedBrands, selectedModels]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        modelDatas :
        {modelDatas.map(
          (
            model: string // models 매개변수에 대한 타입 명시
          ) => (
            <button key={model} onClick={() => setSelectedModels(model)}>
              {model}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default FetchModelDatas;
