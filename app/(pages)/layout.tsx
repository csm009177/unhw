'use client'
import { useEffect, useState } from "react";
import "../globals.css";
interface ChildrenProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: ChildrenProps) {
  const [tokenState, setTokenstate ]= useState<boolean>(true)
  useEffect(()=>{
    setTokenstate(tokenState)
  },[tokenState])
  return (<>
  
    {children}
  </>);
}
