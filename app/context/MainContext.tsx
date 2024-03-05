// styleContext.tsx
import { createContext } from "react";

export const openContext = createContext<boolean| null >(null);

export const tokenContext = createContext<boolean | null>(null);

export const selectedProjectContext = createContext<boolean|null>(null);