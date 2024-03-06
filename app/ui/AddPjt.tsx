"use client";

import "../globals.css";
import { useState, useContext } from "react";
import { openContext, selectedProjectContext } from "../context/MainContext";

export default function AddPjt() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [project, setProject] = useState([]);
  const { isOpen, setIsOpen } = useContext(openContext);
  const { selectedPjtIndex, setSelectedPjtIndex } = useContext(selectedProjectContext)
  // const href = `/pjt${selectedPjtIndex}`; // 동적 URL 생성
  
  const addProject = () => {
    const newProject = `project ${project.length}`;
    setProject([...project, newProject]);
  };

  const handleItemClick = (index) => {
    setSelectedPjtIndex(index);
  };

  return (
    <div style={{ width: isOpen ? "100%" : "0%", color:"#FFFFFF" }}>
      <p onClick={addProject} style={{fontSize:"5vh"}}>unhw</p>
      <ul>
        <br />
        {project.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
