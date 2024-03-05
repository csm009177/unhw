"use client";

import { useState, useContext } from "react";
import "../globals.css";
import { openContext, selectedProjectIndex } from "../context/MainContext";

export default function AddProjectList() {
  const [url, setUrl] = useState(window.location.pathname); // 현재 URL 경로를 가져옴
  const [project, setItems] = useState([]);

  const addProject = () => {
    const newProject = `Project ${project.length}`;
    setItems([...project, newProject]);
  };

  const handleItemClick = (index) => {
    setSelectedProjectIndex(index);
  };

  return (
    <>
      <p onClick={addProject} style={{ fontSize: "5vh" }}>unhw</p>
      <ul>
        <br />
        {project.map((project, index) => (
          <li key={index} onClick={() => handleItemClick(index)}>
            {project}
          </li>
        ))}
      </ul>
    </>
  );
}
