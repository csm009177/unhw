"use client";

import {
  brandsContext,
  selectedBrandsContext,
  selectedTypesContext,
} from "@/app/context/MainContext";
import React, { useContext, useEffect, useState } from "react";

const FetchBrand: React.FC = () => {
  const { brands, setBrands } = useContext(brandsContext);

  const { selectedTypes, setSelectedTypes } = useContext(selectedTypesContext);
  const { selectedBrands, setSelectedBrands } = useContext(selectedBrandsContext);
  

  const fetchBrands = async (selectedType: string) => {
    try {
      const response = await fetch(`/fetchBrands?type=${selectedType}`);
      const data = await response.json();
      setBrands(data.brands); // brands 배열 설정
    } catch (error) {
      console.error("브랜드를 가져오는 도중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (selectedTypes) {
      fetchBrands(selectedTypes);
    }
  }, [selectedTypes]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
          maxWidth:"100vh",
          overflowX:'hidden',
          overflow:'scroll'
        }}
      >
        brands :
        {brands.map(
          (
            brand: string // brand 매개변수에 대한 타입 명시
          ) => (
            <button key={brand} onClick={() => setSelectedBrands(brand)}>
              {brand}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default FetchBrand;
