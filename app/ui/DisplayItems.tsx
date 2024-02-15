'use client'
import React, { useState } from 'react';

const DisplayItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="검색어를 입력하세요..."
      />
      <button onClick={handleSearch}>검색</button>
      
      <ul>
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
