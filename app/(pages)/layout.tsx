"use client";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import Toggle from "@/app/ui/Toggle";
import Lobby from "../ui/Lobby";
import { usePathname, useRouter } from "next/navigation";
import { openContext, selectedProjectContext } from "../context/MainContext";
import IdPage from './[id]/page';

interface ChildrenProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: ChildrenProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [showToggle, setShowToggle] = useState<boolean>(false);
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [showLobby, setShowLobby] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowLobby(false);
      setShowChildren(true);
      setShowToggle(true);
      if (pathname === "/login") {
        router.push('/')
      }
      if (pathname === "/signup") {
        router.push('/')
      }
    }
    if (!token) {
      setShowChildren(false);
      setShowToggle(false);
      setShowLobby(true);
      if (pathname === "/login") {
        setShowChildren(true);
        setShowLobby(false);
      }
      if (pathname === "/signup") {
        setShowChildren(true);
        setShowLobby(false);
      }
    }
  }, [pathname,showToggle, showChildren, showLobby, router]);

  const [isOpen, setIsOpen] = useState(true);
  const [selectedPjtIndex, setSelectedPjtIndex] = useState<number|null>(null);

  return (
    <selectedProjectContext.Provider value={{selectedPjtIndex, setSelectedPjtIndex}}>
        <openContext.Provider value={{ isOpen, setIsOpen }}>
          <div style={{display:"flex", flexDirection:"row"}}>
            {showToggle ? <Toggle /> : null}
            {showChildren ? children : null}
          </div>
            {showLobby ? <Lobby /> : null}
        </openContext.Provider>
    </selectedProjectContext.Provider>
  );
}
