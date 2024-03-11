"use client";

import {
  selectedTypesContext,
  selectedBrandsContext,
  selectedModelsContext,
  modelDatasContext,
  selectedProductContext,
} from "@/app/context/MainContext";
import React, { useContext, useEffect, useState } from "react";

interface ModelData {
  type: string;
  part_number: string;
  brand: string;
  model: string;
  rank: number;
  benchmark: number;
  samples: number;
  url: string;
}

const FetchModelDatas: React.FC = () => {
  const { modelDatas, setModelDatas } = useContext(modelDatasContext);

  const { selectedTypes, setSelectedTypes } = useContext(selectedTypesContext);
  const { selectedBrands, setSelectedBrands } = useContext(
    selectedBrandsContext
  );
  const { selectedModels, setSelectedModels } = useContext(
    selectedModelsContext
  );
  const { selectedProduct, setSelectedProduct } = useContext(
    selectedProductContext
  );

  const fetchModelDatas = async (
    selectedTypes: string,
    selectedBrands: string,
    selectedModels: string
  ) => {
    try {
      const response = await fetch(
        `/fetchModelDatas?type=${selectedTypes}&brand=${selectedBrands}&model=${selectedModels}`
      );
      const data = await response.json();
      setModelDatas(data.modelDatas); // models 배열 설정
    } catch (error) {
      console.error("모델을 가져오는 도중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (selectedTypes && selectedBrands && selectedModels) {
      fetchModelDatas(selectedTypes, selectedBrands, selectedModels);
      if (selectedModels) {
        console.log("selectedModels : " + selectedModels);
      }
    }
  }, [selectedTypes, selectedBrands, selectedModels]);

  const handleClickProduct = async (selectedModels: []) => {
    setSelectedProduct((prevState) => [...prevState, selectedModels]);
    console.log(selectedModels);
  };

  return (
    <>
      <div>Detail : </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          overflowX: "hidden",
          maxWidth: "100vw",
          overflow: "scroll",
        }}
      >
        {modelDatas ? (
          modelDatas.map((info: ModelData, index: number) => (
            <button
              key={index}
              onClick={() => handleClickProduct(selectedModels)}
            >
              <ul>
                <li>Type: {info.type}</li>
                <li>Part Number: {info.part_number}</li>
                <li>Brand: {info.brand}</li>
                <li>Model: {info.model}</li>
                <li>Rank: {info.rank}</li>
                <li>Benchmark: {info.benchmark}</li>
                <li>Samples: {info.samples}</li>
              </ul>
              <a href={info.url}>Link Button</a>
            </button>
          ))
        ) : (
          <p>No model information available.</p>
        )}
      </div>
    </>
  );
};

export default FetchModelDatas;
