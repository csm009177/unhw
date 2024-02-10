"use client";
import "../../globals.css";
import { ChildrenProps } from "../ChildrenProps";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lobby from "../../ui/Lobby";
import { useRouter } from "next/navigation";
import ToggleLeftVar from "../../ui/ToggleLeftVar";
import { selectContext, openContext } from "../../context/styleContext";
import { devNull } from "os";
import MainSelectShow from '../../ui/MainSelectShow';

export default function MainLayout({ children }: ChildrenProps) {

  // useEffect(() => {
  //   const token = localStorage.getItem("jwtToken");
  //   if (!token || pathname !== "/") {
  //     setShowLobby(true); // 작업을 위해 임시로 true 해놓음
  //   } else {
  //     setShowLobby(false); // 작업을 위해 임시로 false 해놓음
  //   }
  // }, [pathname]);

  return ( <div style={{width:"100%"}}>
    <MainSelectShow/>
    { children }
  </div>);
}
