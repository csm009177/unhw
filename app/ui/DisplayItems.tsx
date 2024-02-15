'use client'
import React, { useEffect, useState } from 'react';

const DisplayItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]); // brand 필드의 값들을 저장할 상태 추가
  const [models, setModels] = useState([]);
  useEffect(() => {
    fetchTypes();
    fetchBrands();
    fetchModels(); // 컴포넌트가 마운트될 때 model 필드의 값들을 가져오는 함수 호출
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

  const fetchBrands = async () => {
    try {
      const response = await fetch('/fetchBrands'); // 서버에 brand 필드의 값들을 가져오는 요청
      const data = await response.json();
      setBrands(data.brands); // 가져온 brand 값들을 상태에 저장
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await fetch('/fetchModels'); // 서버에 model 필드의 값들을 가져오는 요청
      const data = await response.json();
      setModels(data.models); // 가져온 model 값들을 상태에 저장
    } catch (error) {
      console.error('Error fetching models:', error);
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

  const handleTypeFilter = async (type) => {
    setSearchTerm(type);
    handleSearch();
  };

  const handleBrandFilter = async (brand) => {
    setSearchTerm(brand); // brand 버튼을 클릭하면 해당 brand를 검색어로 설정하여 검색 수행
    handleSearch(); // 검색 수행
  };

  const handleModelFilter = async (model) => {
    setSearchTerm(model); // model 버튼을 클릭하면 해당 model을 검색어로 설정하여 검색 수행
    handleSearch(); // 검색 수행
  };

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <div style={{display:"flex"}}>
      <input
        type="text"
        style={{color:"black"}}
        value={searchTerm}
        onChange={handleChange}
        placeholder="검색어를 입력하세요..."
      />
      <button onClick={handleSearch}>검색</button>
      </div>
      <div style={{width:"80%", display:"flex", flexDirection:"row", justifyContent:"space-between" }}>
        {types.map(type => (
          <button key={type} onClick={() => handleTypeFilter(type)}>{type}</button>
        ))}
      </div>
      <div style={{display:"flex", flexDirection:"row",  maxHeight:"5vh", overflowX:"scroll", maxWidth:"80vw"}}>
        {/* brand 필드의 값들로 버튼 생성 */}
        {brands.map(brand => (
          <button key={brand} onClick={() => handleBrandFilter(brand)}>{brand}</button>
        ))}
      </div>
      <div style={{display:"flex", flexDirection:"row",  maxHeight:"5vh", overflowX:"scroll", maxWidth:"80vw"}}>
        {/* model 필드의 값들로 버튼 생성 */}
        {models.map(model => (
          <button key={model} onClick={() => handleModelFilter(model)}>{model}</button>
        ))}
      </div>
      <ul >
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
