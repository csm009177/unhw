"use client";

import React, { useEffect, useState } from "react";

export default function DisplayItems() {
  const [types, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const [brands, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 검색을 처리하는 함수입니다.
  const handleSearch = async () => {
    try {
      const response = await fetch("/searchItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: searchTerm }),
      });
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error("Error searching items:", error);
    }
  };

  // 입력값 변경을 처리하는 함수입니다.
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 처음 랜더링될때 아이템 유형을 가져오는 비동기 함수입니다.
  const fetchTypes = async () => {
    try {
      const response = await fetch("/fetchTypes");
      const data = await response.json();
      setType(data.types);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 아이템 유형을 가져오는 함수를 호출합니다.
  useEffect(() => {
    fetchTypes();
  }, []);

  // 선택된 아이템 유형에 따라 브랜드를 가져오는 비동기 함수입니다.
  const fetchBrand = async (selectedType) => {
    try {
      const response = await fetch(`/fetchBrands?type=${selectedType}`);
      const data = await response.json();
      setBrand(data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // 선택된 아이템 유형이 변경될 때마다 해당 유형에 대한 브랜드를 가져오도록 합니다.
  useEffect(() => {
    if (selectedType !== "") {
      fetchBrand(selectedType);
    }
  }, [selectedType]);

  // 선택된 아이템 유형과 브랜드에 따라 모델을 가져오는 비동기 함수입니다.
  const fetchModel = async (selectedType, selectedBrand) => {
    try {
      const response = await fetch(
        `/fetchModels?type=${selectedType}&brand=${selectedBrand}`
      );
      const data = await response.json();
      setModel(data.models);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  // 선택된 브랜드가 변경될 때마다 해당 브랜드에 대한 모델을 가져오도록 합니다.
  useEffect(() => {
    if (selectedBrand !== "") {
      fetchModel(selectedType, selectedBrand);
    }
  }, [selectedType, selectedBrand]);


  return (
    <>
      {/* 검색창 */}
      <div style={{ display: "flex" }}>
        <input
          type="text"
          style={{ color: "black" }}
          value={searchTerm}
          onChange={handleChange}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {/* 선택된 상태 데이터 */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "10%" }}>selectedType : {selectedType}</div>
        <div style={{ width: "10%" }}>selectedBrand : {selectedBrand}</div>
        <div style={{ width: "10%" }}>selectedModel : {selectedModel}</div>
      </div>
      {/* TYPE 버튼들 */}
      <div>
        {types.map((type) => (
          <button key={type} onClick={() => setSelectedType(type)}>
            {type}
          </button>
        ))}
      </div>
      {/* BRAND 버튼들 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "10vh",
          overflow: "scroll",
        }}
      >
        {brands.map((brand) => (
          <button key={brand} onClick={() => setSelectedBrand(brand)}>
            {brand}
          </button>
        ))}
      </div>
      {/* MODEL 버튼들 */}
      <div>
        {model.map((model) => (
          <button key={model} onClick={() => setSelectedModel(model)}>
            {model}
          </button>
        ))}
      </div>
    </>
  );
}
