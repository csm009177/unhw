"use client";

import {
  brandsContext,
  selectedBrandsContext,
  selectedTypesContext,
} from "@/app/context/MainContext";
import React, { useContext, useEffect, useState } from "react";

const FetchModels: React.FC = () => {
  const { selectedTypes } = useContext(selectedTypesContext);
  const { setBrands } = useContext(brandsContext);
  const { selectedBrands, setSelectedBrands } = useContext(
    selectedBrandsContext
  );
  const [brands, setLocalBrands] = useState<string[]>([]); // brands 배열 추가

  const fetchModels = async (selectedType: string, selectedBrands:string) => {
    try {
      const response = await fetch(`/fetchModels?type=${selectedTypes}&brand=${selectedBrands}`);
      const data = await response.json();
      setLocalBrands(data.models); // brands 배열 설정
    } catch (error) {
      console.error("모델을 가져오는 도중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (selectedTypes&& selectedBrands) {
      fetchModels(selectedTypes);
    }
  }, [selectedTypes, selectedBrands]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        models :
        {models.map(
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

export default FetchModels;
