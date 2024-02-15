'use client';

import { useState, useEffect, useContext } from "react";
import { selectContext } from "../context/styleContext";

export default function MainSelectShow() {
  const { selectedItemIndex } = useContext(selectContext);
  const [pmpContents, setPmpContents] = useState("");
  const [chatLogs, setChatLogs] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    type: false,
    brand: false,
    model: false,
  });

  // CPU 데이터를 불러오는 함수
  const fetchCpuData = async () => {
    try {
      const response = await fetch("/data.csv");
      const csvData = await response.text();
      const rows = csvData.split("\n").map(row => row.split(","));
      const headers = rows[0];
      const data = rows.slice(1).map(row => {
        return headers.reduce((obj, key, index) => {
          obj[key.trim()] = row[index].trim();
          return obj;
        }, {});
      });
      setCpuData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching CPU data:", error);
    }
  };

  // 아이템 선택 핸들러
  const handleItemClick = (index) => {
    if (selectedItemIndex === index) {
      setSelectedItemIndex(null);
    } else {
      setSelectedItemIndex(index);
    }
  };

  // 필터링 함수
  const applyFilters = () => {
    let filtered = cpuData;
    if (filters.type) {
      filtered = filtered.filter(item => item.Type === "CPU");
    }
    if (filters.brand) {
      filtered = filtered.filter(item => item.Brand === "Intel");
    }
    if (filters.model) {
      filtered = filtered.filter(item => item.Model === "Core i9-14900KF");
    }
    setFilteredData(filtered);
  };

  useEffect(() => {
    // CPU 데이터를 불러옴
    fetchCpuData();
  }, []);

  useEffect(() => {
    // 필터링 적용
    applyFilters();
  }, [filters]);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  // 채팅 입력 제출 함수
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/pmpForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedItemIndex, pmpContents }),
      });
      console.log("Chat submitted successfully!");
      // 제출 후 채팅 내용 다시 불러오기
      fetchChatLogs();
      // 입력창 초기화
      setPmpContents("");
    } catch (error) {
      console.error("Error submitting chat:", error);
    }
  };

  return (
    <div className="Main-RightCont" style={{ width: "100%", height: "100%", backgroundColor: "#373737", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
      {/* 선택된 아이템이 있을 경우 메시지 표시 */}
      {/* CPU 데이터 필터링을 위한 체크박스 */}
      <div style={{ marginTop: 20 }}>
        <label>
          <input type="checkbox" name="type" checked={filters.type} onChange={handleCheckboxChange} />
          CPU
        </label>
        <label style={{ marginLeft: 10 }}>
          <input type="checkbox" name="brand" checked={filters.brand} onChange={handleCheckboxChange} />
          Intel
        </label>
        <label style={{ marginLeft: 10 }}>
          <input type="checkbox" name="model" checked={filters.model} onChange={handleCheckboxChange} />
          Core i9-14900KF
        </label>
      </div>
      {/* 필터링된 CPU 데이터 출력 */}
      {filteredData.map((item, index) => (
        <div key={index} onClick={() => handleItemClick(index)} style={{ cursor: "pointer", marginBottom: 10 }}>
          {selectedItemIndex === index ? "▼ " : "► "} {item.Brand} {item.Model}
        </div>
      ))}
    </div>
  );
}
