"use client";

import { selectedTypesContext, typesContext } from "@/app/context/MainContext";
import React, { useContext, useEffect } from "react";


const FetchTypes: React.FC = () => {
  const { types, setTypes } = useContext(typesContext);
  const {setSelectedTypes} = useContext(selectedTypesContext)

  const fetchTypes = async () => {
    try {
      const response = await fetch("/fetchTypes");
      const data = await response.json();
      setTypes(data.types);
    } catch (err) {
      console.error("Error fetching types:", err);
    }
  };

  useEffect(() => {
    fetchTypes();
  },[]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        types :
        {types.map((type) => (
          <button key={type} onClick={() => setSelectedTypes(type)}>
            {type}
          </button>
        ))}
      </div>
    </>
  );
};

export default FetchTypes;
