'use client'
import React, { useEffect, useState } from 'react';

const DisplayItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await fetch('/fetchTypes');
      const data = await response.json();
      setTypes(data.types);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  const fetchBrands = async (selectedType) => {
    try {
      const response = await fetch(`/fetchBrands?type=${selectedType}`);
      const data = await response.json();
      setBrands(data.brands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchModels = async (selectedType, selectedBrand) => {
    try {
      const response = await fetch(`/fetchModels?type=${selectedType}&brand=${selectedBrand}`);
      const data = await response.json();
      setModels(data.models);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleTypeFilter = async (type) => {
    setSearchTerm('');
    setSearchResults([]);
    fetchBrands(type);
  };

  const handleBrandFilter = async (brand) => {
    setSearchTerm('');
    setSearchResults([]);
    fetchModels('CPU', brand);
  };

  const handleModelFilter = async (model) => {
    setSearchTerm(model);
    handleSearch();
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('/searchItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword: searchTerm })
      });
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          style={{ color: "black" }}
          value={searchTerm}
          onChange={handleChange}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        {types.map(type => (
          <button key={type} onClick={() => handleTypeFilter(type)}>{type}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "row", maxHeight: "5vh", overflowX: "scroll", maxWidth: "80vw" }}>
        {brands.map(brand => (
          <button key={brand} onClick={() => handleBrandFilter(brand)}>{brand}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll", maxWidth: "80vw" }}>
        {models.map(model => (
          <button key={model} onClick={() => handleModelFilter(model)}>{model}</button>
        ))}
      </div>
      <ul style={{ maxHeight: "30vh", overflow: "scroll" }}>
        {searchResults.map(item => (
          <li key={item.id}>
            <p>Type: {item.type}</p>
            <p>Part Number: {item.part_number}</p>
            <p>Brand: {item.brand}</p>
            <p>Model: {item.model}</p>
            <p>Rank: {item.rank}</p>
            <p>Benchmark: {item.benchmark}</p>
            <p>Samples: {item.samples}</p>
            <p>URL: <a href={item.url}>{item.url}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayItems;
