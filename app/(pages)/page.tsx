"use client";

// Main 컴포넌트
import React, { useState } from "react";
import "../globals.css";
import ToggleLeftVar from "../ui/ToggleLeftVar";
import { openContext, selectContext } from "../context/styleContext";
import MainSelectShow from "../ui/MainSelectShow";
import ItemPage from "./[id]/page";
import TokkenCheck from "../ui/TokkenCheck";

export default function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  // TokkenCheck()
  return <ItemPage />;
}
