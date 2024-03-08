import { createContext, Dispatch, SetStateAction } from "react";

// openContext - 토글이 열렸는지 불리언을 업데이트하는 함수
export const openContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>({ isOpen: false, setIsOpen: () => {} });

// setSelectedPjtIndex - 선택된 프로젝트의 인덱스를 업데이트하는 함수
export const selectedProjectContext = createContext<{
  selectedPjtIndex: number | null;
  setSelectedPjtIndex: Dispatch<SetStateAction<number | null>>;
}>({ selectedPjtIndex: null, setSelectedPjtIndex: () => {} });
// () => {}는 빈 함수를 나타냅니다. 이는 초기값으로 빈 함수를 설정해두었으며, 
// 실제로는 컴포넌트에서 이 함수를 호출하여 상태를 업데이트할 때 해당 함수의 내용이 정의됩니다.

// typesContext - 타입의 문자열을 업데이트하는 함수
export const typesContext = createContext<{
  types: string[];
  setTypes: Dispatch<SetStateAction<string[]>>;
}>({ types: [], setTypes: () => {} });

// selectedTypeContext - 선택된 타입의 문자열을 업데이트하는 함수
export const selectedTypesContext = createContext<{
  selectedTypes: string| null;
  setSelectedTypes: Dispatch<SetStateAction< string | null>>;
}>({ selectedTypes: null, setSelectedTypes: () => {} });

// brandContext - 브랜드의 문자열을 업데이트하는 함수
export const brandsContext = createContext<{
  brands: string[];
  setBrands: Dispatch<SetStateAction<string[]>>;
}>({ brands: [], setBrands: () => {} });

// selectedBrandContext - 선택된 브랜드의 문자열을 업데이트하는 함수
export const selectedBrandsContext = createContext<{
  selectedBrands : string| null;
  setSelectedBrands: Dispatch<SetStateAction< string | null>>;
}>({ selectedBrands: null, setSelectedBrands: () => {} });

// modelsContext - 모델의 문자열을 업데이트하는 함수
export const modelsContext = createContext<{
  models: string[];
  setModels: Dispatch<SetStateAction<string[]>>;
}>({ models: [], setModels: () => {} });

// selectedModelsContext - 선택된 모델의 문자열을 업데이트하는 함수
export const selectedModelsContext = createContext<{
  selectedModels : string| null;
  setSelectedModels: Dispatch<SetStateAction< string | null>>;
}>({ selectedModels: null, setSelectedModels: () => {} });

// modelDatasContext - 모델정보의 배열을 업데이트하는 함수
export const modelDatasContext = createContext<{
  modelDatas: [];
  setModelDatas: Dispatch<SetStateAction<[]>>;
}>({ modelDatas: [], setModelDatas: () => {} });

// selectedProductContext - 선택된 상품의 배열을 업데이트하는 함수
export const selectedProductContext = createContext<{
  selectedProduct: []|null;
  setSelectedProduct: Dispatch<SetStateAction< [] | null>>;
}>({ selectedProduct: null, setSelectedProduct: () => {} });