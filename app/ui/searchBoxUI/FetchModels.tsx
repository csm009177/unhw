"use client";

import {
  modelsContext,
  selectedTypesContext,
  selectedBrandsContext,
  selectedModelsContext,
} from "@/app/context/MainContext";
import React, { useContext, useEffect, useState } from "react";

const FetchModels: React.FC = () => {
  const { models, setModels } = useContext(modelsContext);

  const { selectedTypes, setSelectedTypes } = useContext(selectedTypesContext);
  const { selectedBrands, setSelectedBrands } = useContext(
    selectedBrandsContext
  );
  const { selectedModels, setSelectedModels } = useContext(
    selectedModelsContext
  );

  const fetchModels = async (selectedType: string, selectedBrands: string) => {
    try {
      const response = await fetch(
        `/fetchModels?type=${selectedTypes}&brand=${selectedBrands}`
      );
      const data = await response.json();
      setModels(data.models); // models 배열 설정
    } catch (error) {
      console.error("모델을 가져오는 도중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (selectedTypes && selectedBrands) {
      fetchModels(selectedTypes, selectedBrands);
    }
  }, [selectedTypes, selectedBrands]);

  return (
    <>
    models :
    <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      overflowX:'hidden',
      overflow:'scroll',
      maxWidth:"100vh",
    }}
  >
      {models.map(
        (
          model: string // models 매개변수에 대한 타입 명시
        ) => (
          <button 
          key={model} onClick={() => setSelectedModels(model)}>
            {model}
          </button>
        )
      )}
    </div>
    </>
  );
};

export default FetchModels;
