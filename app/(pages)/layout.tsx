"use client";
import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lobby from "../ui/Lobby";
import { useRouter } from "next/navigation";
import ToggleLeftVar from "../ui/ToggleLeftVar";
import { selectContext, openContext } from "../context/styleContext";
import { devNull } from "os";

export default function MainLayout({ children }: ChildrenProps) {
  const pathname = usePathname();
  const router = useRouter()
  const [showLeft, setShowLeft] = useState(true); // 변수명 수정
  const [showChild, setshowChild] = useState(true); // 변수명 수정
  const [showLobby, setShowLobby] = useState(false); // 변수명 수정
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    // 토큰이 없는 경우
    if ( !token ) {
      if (pathname === "/lobby") {
        setShowLeft(false);
        setShowLobby(true);
        setshowChild(false);
      }
      if(pathname === "/login" || pathname === "/signup"){
        setShowLeft(false);
        setShowLobby(false);
        setshowChild(true);
      }
      if(pathname !== "/lobby" && pathname !== "/login" && pathname !== "/signup"){
        router.push("/lobby")
      }
    // 토큰이 있는 경우
    } else {
      if(pathname === "/"){
        setShowLeft(true);
        setShowLobby(false);
        setshowChild(true);
      }
    }
  }, [pathname]);

  return (
    <div className="flex flex-row justify-between h-screen overflow-hidden">
      <selectContext.Provider
        value={{ selectedItemIndex, setSelectedItemIndex }}
      >
        <openContext.Provider value={{ isOpen, setIsOpen }}>
          {showLeft ? <ToggleLeftVar /> : null}
          {showLobby ? <Lobby /> : null} {/* 조건부 렌더링 */}
          {showChild ? children : null}
        </openContext.Provider>
      </selectContext.Provider>
    </div>
  );
}
