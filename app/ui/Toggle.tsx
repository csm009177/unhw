"use client";

import { useContext, useState } from "react";
import "../globals.css";
import { openContext, selectedProjectContext } from "../context/MainContext";
import AddProjectList from "./AddProjectList";

export default function Toggle() {
  const { isOpen, setIsOpen } = useContext(openContext);
  const { selectedPjtIndex, setSelectedPjtIndex } = useContext(
    selectedProjectContext
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        width: isOpen ? "20vw" : "2vw",
        display: "flex",
        height: "100vh",
        backgroundColor: "#434343",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          background: "#434343",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{width: isOpen? "100%":"0%"}}>
        <AddProjectList
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedPjtIndex={selectedPjtIndex}
          setSelectedPjtIndex={setSelectedPjtIndex}
        />
        </div>
        <button
          onClick={handleToggle}
          style={{ backgroundColor: "#434343", fontSize: "2vw" }}
        >
          {isOpen ? "◀" : "▶"}
        </button>
      </div>
    </div>
  );
}
