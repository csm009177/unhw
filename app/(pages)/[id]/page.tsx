'use client'
import { useRouter } from "next/router";
// item/[id].tsx

import { useContext, useEffect } from "react";
import MainSelectShow from '../../ui/MainSelectShow';
import { openContext, selectContext } from "@/app/context/styleContext";


export default function ItemPage() {
  const { isOpen, setIsOpen } = useContext(openContext);
  const { selectedItemIndex, setSelectedItemIndex } = useContext(selectContext);
  const href = window.location.href
  useEffect(() => {
    // 페이지가 렌더링될 때마다 id를 출력하여 확인합니다.
    console.log(href);
  }, []);

  return (
    <div>
      <MainSelectShow/>
    </div>
  );
}
