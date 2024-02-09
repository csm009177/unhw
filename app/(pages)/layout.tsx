'use client'
import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import { useEffect, useState } from "react";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";
import Lobby from "../ui/Lobby";
import { useRouter } from "next/navigation";


export default function MainLayout({ children }: ChildrenProps) {
  const [showLobby, setShowLobby] = useState(true); // 변수명 수정
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token || pathname === "/") {
      setShowLobby(false);
    } else {
      setShowLobby(true);
    }
  }, [pathname]);

  return (
    <div className='flex flex-col justify-between h-screen w-screen overflow-hidden'>
      {showLobby ? children : <Lobby/>} {/* 조건부 렌더링 */}
    </div>
  );
}
