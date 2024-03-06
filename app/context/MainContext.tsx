import { createContext, Dispatch, SetStateAction } from "react";

// openContext
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
