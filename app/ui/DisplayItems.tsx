'use client'
import { useState, useEffect } from 'react';

const DisplayItems = () => {
  // 상태 변수들을 정의합니다.
  const [items, setItems] = useState([]); // 아이템 목록을 저장하는 상태
  const [categories, setCategories] = useState([]); // 카테고리 목록을 저장하는 상태
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리를 저장하는 상태

  // CSV 파일에서 데이터를 읽어와 상태에 저장하는 함수
  const fetchData = async () => {
    try {
      // CSV 파일을 fetch하여 응답을 받습니다.
      const response = await fetch('/data.csv');
      // JSON 형태로 변환합니다.
      const data = await response.json();
      console.log(data)
      // 데이터에서 유일한 카테고리 목록을 추출합니다.
      const categories = [...new Set(data.map(item => item[2]))];
      // 상태를 업데이트하여 카테고리 목록을 저장합니다.
      setCategories(categories);
      // 상태를 업데이트하여 전체 아이템 목록을 저장합니다.
      setItems(data);
    } catch (error) {
      console.error('Error fetching data:', error); // 오류가 발생하면 콘솔에 오류 메시지를 출력합니다.
    }
  };

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 데이터를 불러옵니다.
  useEffect(() => {
    fetchData();
  }, [selectedCategory]); // 의존성 배열이 빈 배열이므로 컴포넌트가 처음 렌더링될 때만 실행됩니다.

  // 선택된 카테고리에 해당하는 아이템만 필터링하는 함수
  const filteredItems = items.filter(item => item[2] === selectedCategory);

  return (
    <div style={{ maxWidth: "100%", overflowY:"scroll", maxHeight:"95%"}}>
      {/* 카테고리 목록을 표시합니다. */}
      <h1>카테고리 목록 <h2>선택된 model: {selectedCategory}</h2></h1>
      <ul style={{ maxWidth: "80vh", overflowY:"scroll", maxHeight:"50%", display:"flex", flexDirection:"row"}}>
        {/* 각 카테고리에 대한 버튼을 생성합니다. */}
        {categories.map(category => (
          <li key={category}>
            <button onClick={() => setSelectedCategory(category)}>{category}</button>
          </li>
      ))}
      </ul>
      
      {/* 필터링된 아이템 목록을 표시합니다. */}
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
