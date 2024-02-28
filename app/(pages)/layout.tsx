"use client";
import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Lobby from "./lobby/Lobby";
import ToggleLeftVar from "../ui/ToggleLeftVar";
import { selectContext, openContext } from "../context/styleContext";
import TokkenCheck from "../ui/TokkenCheck";

export default function MainLayout({ children }: ChildrenProps) {
  const pathname = usePathname();
  const param = useSearchParams()
  const router = useRouter();
  const [showLeft, setShowLeft] = useState(true);
  const [showChild, setshowChild] = useState(true);
  const [showLobby, setShowLobby] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPjtIndex, setSelectedPjtIndex] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && pathname === "/") {
      setShowLeft(true);
      setShowLobby(false);
      setshowChild(true);
    } else if (!token && pathname === "/lobby") {
      setShowLeft(false);
      setShowLobby(true);
      setshowChild(false);
      TokkenCheck()
    } else if ((!token && pathname === "/login") || pathname === "/signup") {
      setShowLeft(false);
      setShowLobby(false);
      setshowChild(true);
      TokkenCheck()
    }
  }, [pathname, param]);

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
