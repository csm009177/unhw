import { createContext, Dispatch, SetStateAction } from "react";

// openContext
export const openContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>({ isOpen: false, setIsOpen: () => {} });

// selectedProjectContext
export const selectedProjectContext = createContext<{
  selectedPjtIndex: any;
  setSelectedPjtIndex: Dispatch<SetStateAction<any>>;
}>({ selectedPjtIndex: null, setSelectedPjtIndex: () => {} });


// userSelectModel
export const selectedProduct = createContext<{}>({})

// tokenContext는 
export const tokenContext = createContext<boolean | null>(null);