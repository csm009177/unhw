import type { Metadata } from "next";
import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import LotationMent from './ui/LotationMent';


export const metadata: Metadata = {
  title: "unhw",
  description: "Generated by create unhw",
};

// app\(pages)\layout.tsx

import React, { useContext } from "react";
import ToggleLeftVar from "../ui/ToggleLeftVar";
import { openContext, selectContext } from "../context/styleContext";

export default function Layout({ children }:ChildrenProps) {
  const { selectedItemIndex } = useContext(selectContext);
  const { isOpen, setIsOpen } = useContext(openContext);
  return (
    <div className="Layout">
      <ToggleLeftVar />
      {children}
    </div>
  );
}
