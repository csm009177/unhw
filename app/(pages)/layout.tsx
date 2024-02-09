'use client'
import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import { useEffect, useState } from "react";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";
import Lobby from "../ui/Lobby";


export default function MainLayout({ children }: ChildrenProps) {
  const [showLobby, setShowLobby] = useState(true); // 변수명 수정
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname === "/lobby" || pathname === "/signin") {
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
