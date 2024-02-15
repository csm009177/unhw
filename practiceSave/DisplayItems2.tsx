'use client'

import { useState, useEffect } from "react";
import csv from "csv-parser";
import { Readable } from "stream";

const DisplayItems2 = () => {
  const [cpuData, setCpuData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/CPU_UserBenchmarks.csv");
        const stream = Readable.from(await response.text());
        
        const data = [];
        stream
          .pipe(csv())
          .on("data", (row) => {
            data.push(row);
          })
          .on("end", () => {
            setCpuData(data);
          });
      } catch (error) {
        console.error("Error fetching CPU data:", error);
      }
    };

    fetchData();
  }, []);

  // 아이템 선택 핸들러
  const handleItemClick = (index) => {
    if (selectedItem === index) {
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
    }
  };

  // 선택된 아이템 정보
  const selectedItemInfo = selectedItem !== null ? cpuData[selectedItem] : null;

  return (
    <div style={{ width: "100%", overflowY:"scroll", maxHeight:"50%" }}>
      {/* 각 아이템별로 토글 생성 */}
      {cpuData.map((item, index) => (
        <div key={index} onClick={() => handleItemClick(index)} style={{ cursor: "pointer", marginBottom: 10 }}>
          {selectedItem === index ? "▼ " : "► "} {item.Brand} {item.Model}
        </div>
      ))}

      {/* 선택된 아이템의 정보 출력 */}
      {selectedItemInfo && (
        <div>
          <h2>Selected Item</h2>
          <p>Type: {selectedItemInfo.Type}</p>
          <p>Part Number: {selectedItemInfo["Part Number"]}</p>
          <p>Brand: {selectedItemInfo.Brand}</p>
          <p>Model: {selectedItemInfo.Model}</p>
          <p>Rank: {selectedItemInfo.Rank}</p>
          <p>Benchmark: {selectedItemInfo.Benchmark}</p>
          <p>Samples: {selectedItemInfo.Samples}</p>
          <p>URL: <a href={selectedItemInfo.URL} target="_blank" rel="noopener noreferrer">{selectedItemInfo.URL}</a></p>
        </div>
      )}
    </div>
  );
};

export default DisplayItems2;
