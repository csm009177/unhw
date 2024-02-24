"use client";

import React, { useContext, useEffect, useState } from "react";

export default function DisplayItems() {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [result, setResult] = useState("");

  // 처음 랜더링될때 아이템 유형을 가져오는 비동기 함수입니다.
  const fetchTypes = async () => {
    try {
      const response = await fetch("/fetchTypes");
      const data = await response.json();
      setTypes(data.types);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  // 선택된 아이템 유형에 따라 브랜드를 가져오는 비동기 함수입니다.
  const fetchBrands = async (selectedType) => {
    try {
      const response = await fetch(`/fetchBrands?type=${selectedType}`);
      const data = await response.json();
      setBrands(data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  // 컴포넌트가 처음 마운트될 때 아이템 유형을 가져오는 함수를 호출합니다.
  useEffect(() => {
    fetchTypes();
    console.log(selectedType)
  }, [selectedType]);

  return (
    <>
      {types.map((type) => (
        <button key={type} onClick={() => setSelectedType(type)}>
          {type}
        </button>
      ))}
    </>
  );
}
