"use client";
import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lobby from "./lobby/Lobby";
import ToggleLeftVar from "../ui/ToggleLeftVar";
import { selectContext, openContext } from "../context/styleContext";

export default function MainLayout({ children }: ChildrenProps) {
  const pathname = usePathname();
  const param = useSearchParams()
  const [showLeft, setShowLeft] = useState(true);
  const [showChild, setshowChild] = useState(true);
  const [showLobby, setShowLobby] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPjtIndex, setSelectedPjtIndex] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const displayTokenFromLocalStorage = (): string | null => {
    // 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem("token");

    // 가져온 토큰이 있으면 표시하고 없으면 null을 반환합니다.
    if (token) {
      console.log("토큰 : ", token);
      return token;
    } else {
      console.log("토큰이 없습니다.");
      return null;
    }
  };


  useEffect(() => {
    // const token = localStorage.getItem("jwtToken");
    const tokenFromLocalStorage = displayTokenFromLocalStorage();
    setToken(tokenFromLocalStorage);
    if (token && pathname === "/") {
      setShowLeft(true);
      setShowLobby(false);
      setshowChild(true);
    } else if (!token && pathname === "/lobby") {
      setShowLeft(false);
      setShowLobby(true);
      setshowChild(false);
      // TokkenCheck()
    } else if ((!token && pathname === "/login") || pathname === "/signup") {
      setShowLeft(false);
      setShowLobby(false);
      setshowChild(true);
      // TokkenCheck()
    }
  }, [pathname, param, token]);

  return (
    <div className="flex flex-row justify-between h-screen overflow-hidden">
      <selectContext.Provider
        value={{ selectedPjtIndex, setSelectedPjtIndex }}
      >
        <openContext.Provider value={{ isOpen, setIsOpen }}>
          {showLeft ? <ToggleLeftVar /> : null}
          {showLobby ? <Lobby /> : null}
          {showChild ? children : null}
        </openContext.Provider>
      </selectContext.Provider>
    </div>
  );
}
