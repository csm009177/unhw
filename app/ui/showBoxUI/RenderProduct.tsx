"use client";

import {
} from "@/app/context/MainContext";
import React, { useEffect } from "react";


/**
 *! RenderProduct selectedProduct의 상태를 가져와서 화면에 표시하는 컴포넌트입니다
 */

const RenderProduct: React.FC = () => {

  useEffect(() => {

  }, []);

  return (
    <>
      {/* 타입 버튼들을 화면에 표시합니다. */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        
      </div>
    </>
  );
};

export default RenderProduct;
