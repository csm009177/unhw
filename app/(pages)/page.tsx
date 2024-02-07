"use client";

// Main 컴포넌트
import React, { useState } from "react";
import "../globals.css";
import ToggleLeftVar from "../ui/ToggleLeftVar";
import { openContext, selectContext } from "../context/styleContext";

export default function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex ] = useState(null);

  return (
    <selectContext.Provider value={{selectedItemIndex,setSelectedItemIndex }}>
      <openContext.Provider value={{ isOpen, setIsOpen }}>
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
            <ToggleLeftVar />
          </div>
          <div
            className="Main-RightCont"
            style={{
              width: isOpen ? "80%" : "98%",
              height: "100%",
              backgroundColor: "#373737",
              overflow: "hidden",
            }}
          >
            {selectedItemIndex !== null && (
              <div>
                <p>Selected Item : {selectedItemIndex}</p>
              </div>
            )}
          </div>
        </div>
      </openContext.Provider>
    </selectContext.Provider>
  );
}
