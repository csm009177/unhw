"use client";

import React, { useContext, useEffect, useState } from "react";

export default function DisplayItems() {
  const [result, setResult] = useState("");

  // 타입의 상태정보
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  // 처음 렌더링시 타입을 가져오는 비동기함수
  const fetchTypes = async () => {
    try {
      const response = await fetch("/fetchTypes");
      const data = await response.json();
      setTypes(data.types);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };
  // 컴포넌트가 처음 마운트시 타입을 가져오는 함수호출
  useEffect(() => {
    fetchTypes();
    console.log(selectedType);
  }, [selectedType]);

  // 브랜드의 상태정보
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  // 선택된 타입의 브랜드들을 가져오는 함수
  const fetchBrands = async (selectedType) => {
    try {
      const response = await fetch(`/fetchBrands?type=${selectedType}`);
      const data = await response.json();
      setBrands(data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  // 컴포넌트가 처음 마운트시 브랜드를 가져오는 함수를 호출
  useEffect(() => {
    fetchBrands(selectedType);
    console.log(selectedType);
  }, [selectedType]);

  // model의 상태정보
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  // 선택된 브랜드의 모델들을 가져오는 비동기 함수입니다.
  const fetchModels = async (selectedType, selectedBrand) => {
    try {
      const response = await fetch(
        `/fetchModels?type=${selectedType}&brand=${selectedBrand}`
      );
      const data = await response.json();
      setModels(data.models);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };
  // 컴포넌트가 처음 마운트시 model을 가져오는 함수를 호출
  useEffect(() => {
    fetchModels(selectedType, selectedBrand);
    console.log(selectedType, selectedBrand);
  }, [selectedType, selectedBrand]);

  // 선택된 
  const fetchModelInfos = async (    selectedType,    selectedBrand,    selectedModel  ) => {
    try {
      const response = await fetch( `/fetchModelInfos?type=${selectedType}&brand=${selectedBrand}&model=${selectedModel}`
      );
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching modelInfo :", error);
    }
  };

  // 컴포넌트가 처음 마운트시 model을 가져오는 함수를 호출
  useEffect(() => {
    fetchModelInfos(selectedType, selectedBrand,selectedModel);
    console.log(selectedType, selectedBrand,selectedModel);
  }, [selectedType, selectedBrand,selectedModel]);

  return (
    <>
      <div>
        {types.map((type) => (
          <button key={type} onClick={() => setSelectedType(type)}>
            {type}
          </button>
        ))}
      </div>
      <div>
        {brands.map((brand) => (
          <button key={brand} onClick={() => setSelectedBrand(brand)}>
            {brand}
          </button>
        ))}
      </div>
      <div style={{display:"flex", flexDirection:"row", overflow:"scroll", overflowY:"hidden", maxWidth:"80vh"}}>
        {models.map((model) => (
          <button key={model} onClick={() => setSelectedModel(model)}>
            {model}
          </button>
        ))}
      </div>
    </>
  );
}
