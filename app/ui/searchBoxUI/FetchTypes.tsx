"use client";

import { selectedTypesContext, typesContext } from "@/app/context/MainContext";
import React, { useContext, useEffect, useCallback } from "react";

const FetchTypes: React.FC = () => {
  const { types, setTypes } = useContext(typesContext);
  const { setSelectedTypes } = useContext(selectedTypesContext);

  const fetchTypes = useCallback(async () => {
    try {
      const response = await fetch("/fetchTypes");
      const data = await response.json();
      setTypes(data.types);
    } catch (err) {
      console.error("Error fetching types:", err);
    }
  }, [setTypes]);

  useEffect(() => {
    const fetchAndSetTypes = async () => {
      await fetchTypes();
    };

    fetchAndSetTypes();
  }, [fetchTypes]); // fetchTypes 함수를 의존성 배열에 추가

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
