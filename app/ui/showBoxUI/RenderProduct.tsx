
//! RenderProduct selectedProduct의 상태를 가져와서 화면에 표시하는 컴포넌트입니다

import React, { useContext } from "react";
import { selectedProductContext } from "@/app/context/MainContext";
import tokenUserkeyImporter from '../../utils/token/tokenUserkeyImporter';

const RenderProduct: React.FC = () => {
  // 선택된 모델을 기록하는 콘텍스트를 가져옵니다
  const { selectedProduct, setSelectedProduct } = useContext( selectedProductContext );
  // userkey를 가져옵니다
  const userkey = tokenUserkeyImporter();

  // 선택된 모델을 삭제하는 함수입니다.
  const handleDelete = (index: number) => {
    setSelectedProduct((prevState) => {
      // 새로운 배열을 생성하고, 삭제할 인덱스의 요소를 제외한 나머지 요소들을 복사합니다.
      const newState = prevState.filter((_, idx) => idx !== index);
      return newState;
    });
  };
  
  
  // 선택된 모델을 저장하는 위한 함수입니다.
  const handleSave = () => {


    // 선택된 모델을 서버에 저장하는 API를 호출합니다.
    fetch("/api/saveProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 선택된 모델을 서버에 저장합니다.
      body: JSON.stringify({ selectedProduct, userkey}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
    })
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
      {/* 각각의 선택된 모델을 저장하는 버튼. */}
      <button onClick={() => setSelectedProduct([])}>선택한 모델 초기화</button>
      <button onClick={() => handleSave()}>선택한 모델 초기화</button>
    </>
  );
};

export default RenderProduct;
