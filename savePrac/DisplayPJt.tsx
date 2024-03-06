"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { openContext, selectContext } from "../context/styleContext";
import ProjectLogs from "./ProjectLogs";

export default function DisplayItems() {
  // 타입의 상태정보
  const [types, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  // 처음 렌더링시 타입을 가져오는 비동기함수
  const fetchTypes = async () => {
    try {
      const response = await fetch("/fetchTypes");
      const data = await response.json();
      setType(data.types);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };
  // 컴포넌트가 처음 마운트시 타입을 가져오는 함수호출
  useEffect(() => {
    setType([]);
    setBrand([]);
    setModel([]);
    setModelInfo([]);
    fetchTypes();
    fetchBrands(selectedType);
    console.log(selectedType);
  }, [selectedType]);

  // 브랜드의 상태정보
  const [brands, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  // 선택된 타입의 브랜드들을 가져오는 함수
  const fetchBrands = async (selectedType) => {
    try {
      const response = await fetch(`/fetchBrands?type=${selectedType}`);
      const data = await response.json();
      setBrand(data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  // 컴포넌트가 처음 마운트시 브랜드를 가져오는 함수를 호출
  useEffect(() => {
    setBrand([]);
    setModel([]);
    setModelInfo([]);
    fetchBrands(selectedType);
    console.log(selectedType);
  }, [selectedType]);

  // model의 상태정보
  const [models, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  // 선택된 브랜드의 모델들을 가져오는 비동기 함수입니다.
  const fetchModels = async (selectedType, selectedBrand) => {
    try {
      const response = await fetch(
        `/fetchModels?type=${selectedType}&brand=${selectedBrand}`
      );
      const data = await response.json();
      setModel(data.models);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };
  // 컴포넌트가 처음 마운트시 model을 가져오는 함수를 호출
  useEffect(() => {
    setModel([]);
    setModelInfo([]);
    fetchModels(selectedType, selectedBrand);
    console.log(selectedType, selectedBrand);
  }, [selectedType, selectedBrand]);

  // 모델 정보 상태를 초기화합니다.
  const [modelInfo, setModelInfo] = useState([]);

  // 모델 정보를 가져오는 함수에서 API 응답 데이터를 배열로 설정합니다.
  const fetchModelInfos = async (
    selectedType,
    selectedBrand,
    selectedModel
  ) => {
    try {
      // 데이터를 가져오기 전에 상태를 초기화합니다.
      setModelInfo([]);

      const response = await fetch(
        `/fetchModelInfos?type=${selectedType}&brand=${selectedBrand}&model=${selectedModel}`
      );
      const data = await response.json();
      setModelInfo(data.modelInfo); // 배열로 설정
    } catch (error) {
      console.error("Error fetching modelInfo :", error);
      // 에러 발생 시 빈 배열로 초기화합니다.
      setModelInfo([]);
    }
  };

  // 컴포넌트가 처음 마운트시 model을 가져오는 함수를 호출
  useEffect(() => {
    fetchModelInfos(selectedType, selectedBrand, selectedModel);
  }, [selectedType, selectedBrand, selectedModel]);

  const [selectedModelInfo, setSelectedModelInfo] = useState([]);
  // 모델을 선택하는 버튼 클릭 시 해당 모델을 배열에 추가하는 함수
  const handleClickModel = async (model) => {
    setSelectedModelInfo((prevState) => [...prevState, model]);
    console.log(selectedModelInfo);
    // 선택된 모델을 기록하는 함수 호출
    if (selectedModelInfo !== null && selectedPjtIndex !== null) {
      handleRecordSelected();
    }
  };

  // 선택된 모델들을 제거하는 함수
  const handleRemoveModel = (index) => {
    setSelectedModels((prevState) => prevState.filter((_, i) => i !== index));
  };

  // 선택된 프로젝트의 상태값을 가져오기
  const router = useRouter();
  const { selectedPjtIndex } = useContext(selectContext);
  const [pjtContents, setPjtContents] = useState([]);

  // project 개별 페이지 라우팅
  useEffect(() => {
    if (selectedPjtIndex !== null) {
      const href = `/pjt${selectedPjtIndex}`;
      router.push(href);
    }
  }, [selectedPjtIndex, router]);

  // selectedItemIndex가 변경될 때마다 채팅 내용을 불러옴
  useEffect(() => {
    if (selectedPjtIndex !== null) {
      fetchLogs();
    }
  }, [selectedPjtIndex]);

  // project 내용을 불러오기 함수
  const fetchLogs = async () => {
    try {
      const response = await fetch(`/pjtForm/${selectedPjtIndex}`);
      const data = await response.json();
      setPjtContents(data.pjtContents);
      // 데이터가 성공적으로 불려왔는지 확인하기 위해 콘솔에 출력
      console.log("Fetched project contents:", data.pjtContents);
    } catch (error) {
      console.error("Error fetching chat logs:", error);
    }
  };

  // 선택된 모델들을 기록하는 함수
  const handleRecordSelected = async () => {
    console.log(selectedModelInfo);
    try {
      // POST 요청을 보내어 선택한 프로젝트 내용을 DB에 기록합니다.
      const response = await fetch("/pjtForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedPjtIndex,
          pjtContents: selectedModelInfo,
        }),
      });
      if (response.ok) {
        console.log("Selected models recorded successfully!");
        // 기록 완료 후 채팅 내용 다시 불러오기
        fetchLogs();
        // 선택된 모델 초기화
        setSelectedModelInfo([]);
      } else {
        console.error("Failed to record selected models.");
      }
    } catch (error) {
      console.error("Error recording selected models:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "30vh" }}> type : {selectedType} </div>
        <div style={{ width: "30vh" }}> brand : {selectedBrand} </div>
        <div style={{ width: "30vh" }}> model : {selectedModel} </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        types :
        {types.map((type) => (
          <button
            style={{ width: "auto" }}
            key={type}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        brands :
        {brands.map((brand) => (
          <button key={brand} onClick={() => setSelectedBrand(brand)}>
            {brand}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          maxWidth: "100vh",
          scrollbarWidth: "thin", // 스크롤바 너비 설정
          scrollbarColor: "#888 transparent", // 스크롤바 색상 설정
        }}
      >
        {models.map((model) => (
          <button
            key={model}
            onClick={() => setSelectedModel(model)}
            style={{ minWidth: `${model.length * 10}px`, margin: "5px" }}
          >
            {model}
          </button>
        ))}
      </div>
      <div>
        {modelInfo ? (
          modelInfo.map((info, index) => (
            <button 
            key={index} onClick={() => handleClickModel(info.model)}>
              <ul>
                <li>Type: {info.type}</li>
                <li>Part Number: {info.part_number}</li>
                <li>Brand: {info.brand}</li>
                <li>Model: {info.model}</li>
                <li>Rank: {info.rank}</li>
                <li>Benchmark: {info.benchmark}</li>
                <li>Samples: {info.samples}</li>
                <li>
                  <a href={info.url}>Link Button</a>
                </li>
              </ul>
            </button>
          ))
        ) : (
          <p>No model information available.</p>
        )}
      </div>
      <div>
        {/* 선택된 모델들을 나타내는 표시 칸 */}
        {selectedModelInfo.map((model, index) => (
          <div key={index}>
            <button
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => handleRemoveModel(index)}
            >
              {model}
            </button>
          </div>
        ))}
      </div>
      {/* 선택된 프로젝트가 있을때 프로젝트의 콘텐츠를 보여준다 */}
      {selectedPjtIndex !== null && (
        <div style={{ width: "100%", height: "50%", maxHeight: "50%" }}>
          {/* 로그 내용 출력 */}
          <div
            style={{ width: "100%", overflowY: "scroll", maxHeight: "50vh" }}
          >
            {pjtContents.map((content) => (
              <p key={content}>{content.pjtContents}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
