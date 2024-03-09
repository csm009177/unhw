"use client";

/**
 * FetchTypes 컴포넌트는 서버로부터 타입 데이터를 가져와서 화면에 표시하는 컴포넌트입니다.
 */
import {
} from "@/app/context/MainContext";
import React, { useEffect } from "react";

/**
 * FetchTypes 컴포넌트는 속성을 전달받지 않습니다.
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
