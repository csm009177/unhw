"use client";

import React, { useState, useEffect, createContext } from "react";
import "../globals.css";
import ToggleLeftVar from "../ui/ToggleLeftVar";

export default function Main() {
  const [isOpen, setIsOpen] = useState(true);
  // createContext()
  return (
    <div className="Main">
      <div
        className="Main-LeftVar"
        style={{
          width: isOpen ? "20%" : "2%",
          height: "100%",
          backgroundColor: "#434343",
          overflow: "hidden",
        }}
      >
        <ToggleLeftVar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div 
      className="Main-RightCont"
      style={{
        width: isOpen ? "80%" : "98%",
        height: "100%",
        backgroundColor: "#373737",
        overflow: "hidden",
      }}
      ></div>
    </div>
  );
}
