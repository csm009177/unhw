"use client";

import { useContext, useState } from "react";
import "../globals.css";
import { openContext, selectedProjectContext } from "../context/MainContext";
import LogOut from './Logout';

interface AddProjectListProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPjtIndex: any;
  setSelectedPjtIndex: React.Dispatch<React.SetStateAction<any>>;
}

const AddProjectList: React.FC<AddProjectListProps> = () => {
  const [project, setProject] = useState<string[]>([]);
  const { setSelectedPjtIndex } = useContext(selectedProjectContext);
  const { isOpen } = useContext(openContext);

  const addProject = () => {
    const newProject = `project ${project.length}`;
    setProject([...project, newProject]);
  };

  const handleProjectClick = (index: number) => {
    setSelectedPjtIndex(index);
  };

  return (
    <div style={{ width: isOpen ? "100%" : "0%", color: "#FFFFFF" }}>
      <div style={{ height: "90vh" }}>
        <p onClick={addProject} style={{ fontSize: "5vh" }}>
          unhw
        </p>
        <ul>
          {project.map((project, index) => (
            <li key={index} onClick={() => handleProjectClick(index)}>
              {project}
            </li>
          ))}
        </ul>
      </div>
      <LogOut/>
    </div>
  );
};

export default AddProjectList;
