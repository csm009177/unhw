import { createContext, Dispatch, SetStateAction } from "react";

// openContext의 타입 수정
export const openContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>({ isOpen: false, setIsOpen: () => {} });

// tokenContext는 그대로 유지
export const tokenContext = createContext<boolean | null>(null);

// selectedProjectContext의 타입 수정
export const selectedProjectContext = createContext<{
  selectedPjtIndex: any;
  setSelectedPjtIndex: Dispatch<SetStateAction<any>>;
}>({ selectedPjtIndex: null, setSelectedPjtIndex: () => {} });
