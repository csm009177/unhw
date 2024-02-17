'use client'
import React, { useEffect, useState } from 'react';

const DisplayItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  
  const addSearchTerm = (value) => {
    setSearchTerm(prevSearchTerm => {
      // 이미 존재하는 검색어인지 확인하고 중복되지 않게 처리
      if (!prevSearchTerm.includes(value)) {
        return prevSearchTerm + ' ' + value;
      }
      return prevSearchTerm;
    });
  };

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
    setSelectedTypes([type]); // 선택된 type 초기화
    setSearchTerm(type); // 검색어도 선택한 type으로 초기화
    setSearchResults([]); // 검색 결과 초기화
    fetchBrands(type); // 선택한 type에 맞는 브랜드 가져오기
  };

const handleBrandFilter = async (brand) => {
  if (!selectedBrands.includes(brand)) {
    setSelectedBrands(prevBrands => [...prevBrands, brand]);
    addSearchTerm(brand);
    setSearchResults([]);
    fetchModels('CPU', brand);
  }
};

const handleModelFilter = async (model) => {
  if (!selectedModels.includes(model)) {
    setSelectedModels(prevModels => [...prevModels, model]);
    addSearchTerm(model);
    setSearchResults([]);
    handleSearch();
  }
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
