"use client";
// ItemPage 컴포넌트
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import MainSelectShow from "../../ui/MainSelectShow";
import { selectContext } from "@/app/context/styleContext";
import DisplayItems2 from "../../../practiceSave/DisplayItems2";
import DisplayItems from "@/app/ui/DisplayItems";

export default function ItemPage() {
  return (
    <div
      className="Main-RightCont"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#373737",
        overflow: "hidden",
        display: "flex",
        flexDirection:"column",
        color: "white",
      }}
    >
      <DisplayItems />
    </div>
  );
}
