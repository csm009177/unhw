"use client";

/**
 * FetchTypes 컴포넌트는 서버로부터 타입 데이터를 가져와서 화면에 표시하는 컴포넌트입니다.
 */
import {
  selectedBrandsContext,
  selectedModelsContext,
  selectedTypesContext,
  typesContext,
} from "@/app/context/MainContext";
import React, { useContext, useEffect, useCallback } from "react";

/**
 * FetchTypes 컴포넌트는 속성을 전달받지 않습니다.
 */
const FetchTypes: React.FC = () => {
  // MainContext에서 types와 setTypes를 가져옵니다.
  const { types, setTypes } = useContext(typesContext);
  // MainContext에서 setSelectedTypes를 가져옵니다.
  const { selectedTypes, setSelectedTypes } = useContext(selectedTypesContext);

  const { setSelectedBrands } = useContext(selectedBrandsContext);
  const { setSelectedModels } = useContext(selectedModelsContext);

  /**
   * fetchTypes 함수는 서버로부터 타입 데이터를 가져와서 types 상태를 업데이트합니다.
   */
  const fetchTypes = useCallback(async () => {
    try {
      // 서버로부터 타입 데이터를 가져옵니다.
      const response = await fetch("/fetchTypes");
      // JSON 형식으로 파싱합니다.
      const data = await response.json();
      // 가져온 타입 데이터를 types 상태로 업데이트합니다.
      setTypes(data.types);
    } catch (err) {
      // 에러 발생 시 콘솔에 로그를 출력합니다.
      console.error("Error fetching types:", err);
    }
  }, [setTypes]); // setTypes 함수를 의존성으로 설정합니다.

  /**
   * 컴포넌트가 마운트될 때 fetchTypes 함수를 호출하여 타입 데이터를 가져옵니다.
   */
  useEffect(() => {
    const fetchAndSetTypes = async () => {
      // 타입 데이터를 가져와서 상태를 업데이트합니다.
      await fetchTypes();
    };

    // fetchTypes 함수를 호출합니다.
    fetchAndSetTypes();
    console.log(selectedTypes);
  }, [fetchTypes, selectedTypes]); // fetchTypes 함수와 selectedTypes를 의존성으로 설정합니다.

  // selectedTypes가 변경될 때, selectedBrands와 selectedModels를 초기화합니다.
  useEffect(() => {
    setSelectedBrands(null);
    setSelectedModels(null);
  }, [selectedTypes, setSelectedBrands, setSelectedModels]);

  return (
    <>types :
      {/* 타입 버튼들을 화면에 표시합니다. */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          overflowX:'hidden',
          maxWidth:"100vh",
          overflow:'scroll'
        }}
      >
        {/* 타입 버튼들을 매핑하여 표시합니다. */}
        {types.map((type) => (
          <button key={type} onClick={() => setSelectedTypes(type)}>
            {type}
          </button>
        ))}
      </div>
    </>
  );
};

export default FetchTypes;
