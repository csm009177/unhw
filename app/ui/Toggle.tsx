"use client";

import { useContext, useState } from "react";
import "../globals.css";
import { tokenContext } from '../context/MainContext';
import AddProjectList from './AddProjectList';


export default function Toggle() {
  const [ isOpen, setIsOpen ] = useState<boolean>(true);
  useContext(tokenContext)
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="Main-LeftVar"
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
        {/* <AddItemList /> */}
        <button
          onClick={handleToggle}
          style={{ backgroundColor: "#434343", fontSize: "2vw" }}
        >
          
          {/* <AddProjectList/> */}
          {isOpen ? "◀" : "▶"}
        </button>
      </div>
    </div>
  );
}
