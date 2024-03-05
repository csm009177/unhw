"use client";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import Toggle from "@/app/ui/Toggle";
import Lobby from "../ui/Lobby";
import { usePathname, useRouter } from "next/navigation";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: ChildrenProps) {
  const [showToggle, setShowToggle] = useState<boolean>(false);
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const [showLobby, setShowLobby] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter()


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && pathname === "/") {
      setShowLobby(false)
      setShowChildren(true);
      setShowToggle(true);
    }
    if (!token) {
      setShowChildren(false);
      setShowToggle(false);
      setShowLobby(true);
      if(pathname ==="/login"){
        setShowChildren(true);
        setShowLobby(false);
      }
      if(pathname ==="/signup"){
        setShowChildren(true);
        setShowLobby(false);
      }
    }
  }, [pathname, showToggle, showChildren, router]);

  return (
    <>
      {showToggle ? <Toggle /> : null}
      {showChildren ? children : null}
      {showLobby ? <Lobby /> : null}
    </>
  );
}
