'use client'
import { useEffect, useState } from "react";
import "../globals.css";
import Toggle from '../ui/Toggle';
interface ChildrenProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: ChildrenProps) {
  const [tokenState, setTokenstate ]= useState<boolean>(false)
  
  useEffect(()=>{
    if(tokenState)
    setTokenstate(true)
  },[tokenState])
  return (<>
    {tokenState? <Toggle/> : null}
    {children}
  </>);
}
