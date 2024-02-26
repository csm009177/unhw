"use client";
// ItemPage 컴포넌트
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import MainSelectShow from "../../ui/MainSelectShow";
import { selectContext } from "@/app/context/styleContext";
import DisplayItems2 from '../../../practiceSave/DisplayItems2';

export default function ItemPage() {
  return <MainSelectShow />
}
