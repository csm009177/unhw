"use client";

import React, { useContext, useState } from "react";

import RenderProduct from "./showBoxUI/RenderProduct";

// useState의 제네릭 타입을 설정하여 타입 안정성 제공
const ShowBox: React.FC = () => {
  return (
    <>
      <RenderProduct />
    </>
  );
};

export default ShowBox;
