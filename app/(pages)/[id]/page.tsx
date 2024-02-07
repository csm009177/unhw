'use client'
// ItemPage 컴포넌트
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import MainSelectShow from '../../ui/MainSelectShow';
import { selectContext } from "@/app/context/styleContext";

export default function ItemPage() {
  const { selectedItemIndex } = useContext(selectContext);

  return (
    <div>
      <MainSelectShow/>
    </div>
  );
}
