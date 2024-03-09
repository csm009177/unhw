"use client";

import React, { useContext, useState } from "react";

import {
  selectedProductContext,
} from "../context/MainContext";

// useState의 제네릭 타입을 설정하여 타입 안정성 제공
const ShowBox: React.FC = () => {
  const {selectedProduct, setSelectedProduct} = useContext(selectedProductContext)

  return (
    <>
    
    </>
  );
};

export default ShowBox;
