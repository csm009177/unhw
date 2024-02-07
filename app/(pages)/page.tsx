"use client";

// Main 컴포넌트
import React, { useState } from "react";
import "../globals.css";
import ToggleLeftVar from "../ui/ToggleLeftVar";
import { openContext, selectContext } from "../context/styleContext";
import MainSelectShow from '../ui/MainSelectShow';

export default function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  return (
    <selectContext.Provider value={{ selectedItemIndex, setSelectedItemIndex }}>
      <openContext.Provider value={{ isOpen, setIsOpen }}>
        <div className="Main">
            <ToggleLeftVar />
            <MainSelectShow/>
        </div>
      </openContext.Provider>
    </selectContext.Provider>
  );
}
