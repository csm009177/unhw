"use client";

import { brandsContext, selectedTypesContext, typesContext } from "@/app/context/MainContext";
import React, { useContext, useEffect } from "react";


const FetchBrand: React.FC = () => {
  const { types, setTypes } = useContext(typesContext);
  const {selectedTypes, setSelectedTypes} = useContext(selectedTypesContext)
  const {brands, setBrands} = useContext(brandsContext)

  const fetchBrands = async (selectedTypes) => {
    try {
      const response = await fetch(`/fetchBrands?type=${selectedTypes}`);
      const data = await response.json();
      setBrands(data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };



  return (
    <>
    </>
  );
};

export default FetchBrand;
