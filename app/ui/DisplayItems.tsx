'use client';

import { useState, useEffect } from "react";
import csv from "csv-parser";
import { Readable } from "stream";

const MainSelectShow = () => {
  const [cpuData, setCpuData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    type: [],
    brand: [],
    model: [],
  });
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.csv");
        const csvData = await response.json();
        if (!csvData || csvData.length === 0) {
          console.error("CSV data is empty or invalid");
          return;
        }
        const headers = csvData[0];
        const data = csvData.slice(1).map(row => {
          if (row.length !== headers.length) {
            console.error("Invalid CSV row:", row);
            return null;
          }
          return headers.reduce((obj, key, index) => {
            obj[key.trim()] = row[index].trim();
            return obj;
          }, {});
        }).filter(item => item !== null); // Filter out invalid items
        setCpuData(data);
      } catch (error) {
        console.error("Error fetching CPU data:", error);
      }
    };
    

    fetchData();
  }, []);

  const handleCheckboxChange = (optionType, optionValue) => {
    const updatedOptions = { ...filterOptions, [optionType]: [...filterOptions[optionType]] };

    if (updatedOptions[optionType].includes(optionValue)) {
      updatedOptions[optionType] = updatedOptions[optionType].filter((value) => value !== optionValue);
    } else {
      updatedOptions[optionType].push(optionValue);
    }

    setFilterOptions(updatedOptions);
    applyFilters(updatedOptions);
  };

  const applyFilters = (options) => {
    let filtered = [...cpuData];

    Object.entries(options).forEach(([optionType, selectedValues]) => {
      if (selectedValues.length > 0) {
        filtered = filtered.filter((item) => selectedValues.includes(item[optionType]));
      }
    });

    setFilteredItems(filtered);
  };

  return (
    <div>
      {/* Type, Brand, Model에 대한 체크박스 생성 */}
      <div>
        <h3>Type</h3>
        {Array.from(new Set(cpuData.map((item) => item.Type))).map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              checked={filterOptions.type.includes(type)}
              onChange={() => handleCheckboxChange("type", type)}
            />
            {type}
          </label>
        ))}
      </div>

      <div>
        <h3>Brand</h3>
        {Array.from(new Set(cpuData.map((item) => item.Brand))).map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              checked={filterOptions.brand.includes(brand)}
              onChange={() => handleCheckboxChange("brand", brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div className="flex flex-row overflow-x-scroll">
        <h3>Model</h3>
        {Array.from(new Set(cpuData.map((item) => item.Model))).map((model) => (
          <label key={model}>
            <input
              type="checkbox"
              checked={filterOptions.model.includes(model)}
              onChange={() => handleCheckboxChange("model", model)}
            />
            {model}
          </label>
        ))}
      </div>

      {/* 필터링된 아이템들 표시 */}
      <div>
        {filteredItems.map((item, index) => (
          <div key={index}>
            <p>Type: {item.Type}</p>
            <p>Part Number: {item["Part Number"]}</p>
            <p>Brand: {item.Brand}</p>
            <p>Model: {item.Model}</p>
            <p>Rank: {item.Rank}</p>
            <p>Benchmark: {item.Benchmark}</p>
            <p>Samples: {item.Samples}</p>
            <p>URL: <a href={item.URL} target="_blank" rel="noopener noreferrer">{item.URL}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSelectShow;
