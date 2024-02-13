"use client";
import "../globals.css";
import { ChildrenProps } from "./ChildrenProps";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lobby from "../ui/Lobby";
import ToggleLeftVar from "../ui/ToggleLeftVar";
import { selectContext, openContext } from "../context/styleContext";

export default function MainLayout({ children }: ChildrenProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLeft, setShowLeft] = useState(true);
  const [showChild, setshowChild] = useState(true);
  const [showLobby, setShowLobby] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

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
      if (!token && pathname !== "/lobby" && pathname !== "/login" && pathname !== "/signup") {
        router.replace("/lobby"); // push 대신 replace 사용하여 이동
      } 
    } else if ((!token && pathname === "/login") || pathname === "/signup") {
      setShowLeft(false);
      setShowLobby(false);
      setshowChild(true);
      if (!token && pathname !== "/lobby" && pathname !== "/login" && pathname !== "/signup") {
        router.replace("/lobby"); // push 대신 replace 사용하여 이동
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
          {showLobby ? <Lobby /> : null}
          {showChild ? children : null}
        </openContext.Provider>
      </selectContext.Provider>
    </div>
  );
}
