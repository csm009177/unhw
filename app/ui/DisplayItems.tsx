'use client'
import { useState, useEffect } from 'react';

const DisplayItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // CSV 파일에서 데이터를 읽어와 상태에 저장하는 함수
  const fetchData = async () => {
    try {
      const response = await fetch('/CPU_UserBenchmarks.csv');
      const data = await response.json();
      const categories = [...new Set(data.map(item => item[2]))]; // 세 번째 열이 카테고리 이름
      setCategories(categories);
      setItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 컴포넌트가 마운트될 때 데이터를 불러옴

  // 선택된 카테고리에 해당하는 아이템만 필터링하는 함수
  const filteredItems = items.filter(item => item[2] === selectedCategory);

  return (
    <div>
      <h1>카테고리 목록</h1>
      <ul>
        {categories.map(category => (
          <li key={category}>
            <button onClick={() => setSelectedCategory(category)}>{category}</button>
          </li>
        ))}
      </ul>
      <h2>선택된 카테고리: {selectedCategory}</h2>
      <h3>아이템 목록</h3>
      <ul>
        {filteredItems.map(item => (
          <li key={item[1]}>
            <p>Part Number: {item[1]}</p>
            <p>Brand: {item[2]}</p>
            <p>Model: {item[3]}</p>
            <p>Rank: {item[4]}</p>
            <p>Benchmark: {item[5]}</p>
            <p>Samples: {item[6]}</p>
            <p>URL: <a href={item[7]}>{item[7]}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayItems;
