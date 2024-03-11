"use client";

//! RenderProduct selectedProduct의 상태를 가져와서 화면에 표시하는 컴포넌트입니다

import React, { useContext } from "react";
import { selectedProductContext } from "@/app/context/MainContext";

const RenderProduct: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useContext(
    selectedProductContext
  );

  const handleDelete = (index: number) => {
    setSelectedProduct((prevState) => {
      // 새로운 배열을 생성하고, 삭제할 인덱스의 요소를 제외한 나머지 요소들을 복사합니다.
      const newState = prevState.filter((_, idx) => idx !== index);
      return newState;
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          overflowX: "scroll",
          overflow: "hidden",
          maxWidth: "100vw",
          maxHeight: "17vh",
        }}
      >
        {/* 각각의 선택된 모델을 버튼으로 표시합니다. */}
        <div style={{ minHeight: "17vh" }}>
          <br />
          {selectedProduct.map((product, index) => (
            <button
              style={{
                maxWidth: "5vw",
                minWidth: "5vw",
                minHeight: "15vh",
                maxHeight: "15vh",
                marginLeft: "3vw",
                backgroundColor: "#434343"
              }}
              key={index}
              onClick={() => handleDelete(index)}
            >
              {product}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default RenderProduct;
